import assert from 'node:assert/strict';
async function main(){const base=process.env.API_BASE||'http://localhost:4175';const health=await fetch(`${base}/api/health`);assert.equal(health.status,200);assert.equal((await health.json()).status,'ok');const bad=await fetch(`${base}/api/users`,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({name:'缺少字段'})});assert.equal(bad.status,400);console.log('API contract checks passed');}
main();
