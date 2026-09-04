/* Fixture shim — makes the V1 portal run with no backend.
 *
 * Intercepts every /api/* call and answers it from ../fixtures/. Writes are merged
 * into an in-memory copy of the job, so a rep edit looks like it saved for the rest
 * of the session and resets on reload. That is deliberate: this is a prototype.
 *
 * Never talks to production. If you add a route here, add it to docs/data-contract.md
 * too — that file is what Geri builds against.
 */
(function () {
  'use strict';
  var FIXTURES = '../fixtures/';
  var JOB_FIXTURE = FIXTURES + 'jobs/demo-prospect.json';
  var CASE_STUDIES = FIXTURES + 'case-studies/library.json';

  var job = null;          // in-memory job, mutated by writes
  var caseStudies = null;
  var realFetch = window.fetch.bind(window);

  function json(body, status) {
    return new Response(JSON.stringify(body), {
      status: status || 200, headers: { 'Content-Type': 'application/json' }
    });
  }

  async function loadJob() {
    if (!job) job = await realFetch(JOB_FIXTURE).then(function (r) { return r.json(); });
    return job;
  }
  async function loadCaseStudies() {
    if (!caseStudies) caseStudies = await realFetch(CASE_STUDIES).then(function (r) { return r.json(); });
    return caseStudies;
  }

  // Latency so loading states are visible rather than instant — the prototype
  // should show the same shimmer/skeleton behaviour a rep sees in production.
  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  async function route(url, init) {
    var method = ((init && init.method) || 'GET').toUpperCase();
    var path = url.split('?')[0];
    var body = {};
    if (init && init.body) { try { body = JSON.parse(init.body); } catch (e) {} }

    if (path === '/api/case-studies') {
      var lib = await loadCaseStudies();
      return json(lib.case_studies);
    }
    if (path === '/api/sales-reps') {
      return json([{ name: 'Ryan Matsumori' }, { name: 'Edwin Chung' },
                   { name: 'Armando Valencia' }, { name: 'Alexander Gesell' }]);
    }
    if (path === '/api/apollo/suggest') return json([]);
    if (path === '/api/portal-data') return json(await loadJob());

    var m = path.match(/^\/api\/jobs\/([^/]+)(?:\/(.*))?$/);
    if (m) {
      var j = await loadJob();
      var sub = m[2] || '';
      if (method === 'GET' && !sub) return json(j);
      if (sub === 'overrides' && method === 'POST') {
        await delay(200);
        Object.assign(j.extracted_data._overrides, body || {});
        return json({ ok: true, overrides: j.extracted_data._overrides });
      }
      if (sub === 'prospect-info') {
        if (method === 'GET') return json(j.extracted_data.prospect);
        await delay(200);
        Object.assign(j.extracted_data.prospect, body || {});
        return json({ ok: true });
      }
      if (sub === 'rep' && method === 'POST') {
        j.rep_name = (body && body.rep_name) || j.rep_name;
        return json({ ok: true, rep_name: j.rep_name });
      }
      if (sub === 'leads/reveal') {
        await delay(600);
        var idx = body && body.index;
        var lead = j.tasks.lead_list.output.leads[idx];
        if (lead) {
          lead.revealed = true;
          lead.email = lead.name.toLowerCase().split(' ')[0] + '@' + lead.website;
          lead.linkedin_url = 'https://www.linkedin.com/in/example';
        }
        return json({ ok: true, lead: lead || null });
      }
      // regenerate / rerun-tam / rerun-apollo / upload-asset / rescan-brand-colors / icp
      await delay(800);
      return json({ ok: true, prototype: true, note: 'No generation in the prototype — fixture unchanged.' });
    }
    return json({ error: 'No fixture route', path: path }, 404);
  }

  window.fetch = function (input, init) {
    var url = typeof input === 'string' ? input : (input && input.url) || '';
    if (url.indexOf('/api/') !== 0 && url.indexOf('/api/') === -1) return realFetch(input, init);
    if (url.indexOf('/api/') !== 0) return realFetch(input, init);
    return route(url, init).catch(function (e) {
      console.error('[fixture-shim] route failed', url, e);
      return json({ error: String(e) }, 500);
    });
  };

  // The portal reads the job id from the URL path (/<uuid>/<tab>). With no server
  // to route those, expose the fixture job id so the portal finds it on any path.
  window.__FIXTURE_JOB_ID = '00000000-0000-4000-8000-000000000001';
  console.log('[fixture-shim] active — all /api/* calls served from fixtures/, nothing hits production');
})();
