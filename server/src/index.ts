import express from 'express';
const app = express(); app.use((_,res,next)=>{res.setHeader('Access-Control-Allow-Origin','*');next();}); app.use(express.json());
type User={id:string;name:string;email:string;role:string;org:string;status:'active'|'disabled';lastLogin:string};
let users:User[]=[
{id:'u-1001',name:'林晓',email:'lin.xiao@example.test',role:'管理员',org:'华东销售部',status:'active',lastLogin:'2026-10-15 09:20'},
{id:'u-1002',name:'周宁',email:'zhou.ning@example.test',role:'销售经理',org:'华南销售部',status:'active',lastLogin:'2026-10-14 16:05'},
{id:'u-1003',name:'陈可',email:'chen.ke@example.test',role:'只读成员',org:'客户成功部',status:'disabled',lastLogin:'2026-09-29 11:40'}];
const roles=[{name:'管理员',permissions:['用户查看','用户编辑','角色管理']},{name:'销售经理',permissions:['用户查看','用户编辑']},{name:'只读成员',permissions:['用户查看']}];
app.get('/api/health',(_,res)=>res.json({status:'ok',service:'crm-api'}));
app.get('/api/roles',(_,res)=>res.json(roles));
app.get('/api/users',(req,res)=>{const q=String(req.query.q||'').toLowerCase();const r=String(req.query.role||'');res.json(users.filter(u=>(!q||`${u.name}${u.email}${u.org}`.toLowerCase().includes(q))&&(!r||u.role===r)));});
app.get('/api/users/:id',(req,res)=>{const u=users.find(x=>x.id===req.params.id);u?res.json(u):res.status(404).json({message:'用户不存在'});});
app.post('/api/users',(req,res)=>{const {name,email,role,org}=req.body||{};if(!name||!email||!role||!org)return res.status(400).json({message:'name、email、role、org 必填'});const u={id:`u-${Date.now()}`,name,email,role,org,status:'active' as const,lastLogin:'未登录'};users=[u,...users];res.status(201).json(u);});
app.patch('/api/users/:id',(req,res)=>{const i=users.findIndex(x=>x.id===req.params.id);if(i<0)return res.status(404).json({message:'用户不存在'});users[i]={...users[i],...req.body};res.json(users[i]);});
app.delete('/api/users/:id',(req,res)=>{const i=users.findIndex(x=>x.id===req.params.id);if(i<0)return res.status(404).json({message:'用户不存在'});users[i].status='disabled';res.json(users[i]);});
const port=Number(process.env.PORT||4175); app.listen(port,()=>console.log(`CRM API listening on http://localhost:${port}`));
export {app};
