<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
type User = { id: string; name: string; email: string; role: string; org: string; status: 'active'|'disabled'; lastLogin: string };
const seed: User[] = [
  { id:'u-1001', name:'林晓', email:'lin.xiao@example.test', role:'管理员', org:'华东销售部', status:'active', lastLogin:'2026-10-15 09:20' },
  { id:'u-1002', name:'周宁', email:'zhou.ning@example.test', role:'销售经理', org:'华南销售部', status:'active', lastLogin:'2026-10-14 16:05' },
  { id:'u-1003', name:'陈可', email:'chen.ke@example.test', role:'只读成员', org:'客户成功部', status:'disabled', lastLogin:'2026-09-29 11:40' }
];
const users = ref<User[]>([]); const query = ref(''); const role = ref('全部'); const status = ref('全部'); const loading = ref(true); const error = ref('');
const showForm = ref(false); const editing = ref<User|null>(null); const selected = ref<User|null>(null); const toast = ref('');
const form = ref({ name:'', email:'', role:'销售经理', org:'华东销售部' });
const roles = ['管理员','销售经理','只读成员'];
const filtered = computed(() => users.value.filter(u => (!query.value || `${u.name}${u.email}${u.org}`.toLowerCase().includes(query.value.toLowerCase())) && (role.value==='全部'||u.role===role.value) && (status.value==='全部'||(status.value==='启用' ? u.status==='active' : u.status==='disabled'))));
async function load(){ loading.value=true; error.value=''; try { const r=await fetch('/api/users'); if(!r.ok) throw new Error('接口异常'); users.value=await r.json(); } catch { users.value=seed; error.value='当前为演示模式，使用本地种子数据'; } finally { loading.value=false; } }
function openCreate(){ editing.value=null; form.value={name:'',email:'',role:'销售经理',org:'华东销售部'}; showForm.value=true; }
function openEdit(u:User){ editing.value=u; form.value={name:u.name,email:u.email,role:u.role,org:u.org}; showForm.value=true; }
async function save(){ if(!form.value.name || !/^\S+@\S+\.\S+$/.test(form.value.email)){ toast.value='请填写有效姓名和邮箱'; return; } const base=editing.value; const next:User={id:base?.id||`u-${Date.now()}`,...form.value,status:base?.status||'active',lastLogin:base?.lastLogin||'未登录'}; users.value=base?users.value.map(x=>x.id===base.id?next:x):[next,...users.value]; showForm.value=false; toast.value='保存成功'; }
function toggle(u:User){ u.status=u.status==='active'?'disabled':'active'; toast.value=u.status==='active'?'用户已启用':'用户已停用'; }
function reset(){ query.value=''; role.value='全部'; status.value='全部'; }
onMounted(load);
</script>
<template>
  <div class="app-shell">
    <header class="topbar"><div class="brand"><span class="brand-mark">T</span><div><strong>Trae CRM</strong><small>Code CN 全流程演示</small></div></div><span class="env">DEMO ENV</span></header>
    <main class="workspace"><section class="hero"><div><p class="eyebrow">用户与权限中心</p><h1>用户管理</h1><p class="muted">用一套可评审、可测试的 CRM 用户管理体验，演示从需求到发布的完整链路。</p></div><button class="primary" @click="openCreate">＋ 新建用户</button></section>
      <div v-if="error" class="notice">{{ error }}</div><section class="card filters"><input v-model="query" aria-label="搜索用户" placeholder="搜索姓名、邮箱或组织"/><select v-model="role" aria-label="角色筛选"><option>全部</option><option v-for="r in roles" :key="r">{{r}}</option></select><select v-model="status" aria-label="状态筛选"><option>全部</option><option>启用</option><option>停用</option></select><button class="ghost" @click="reset">重置</button></section>
      <section class="card table-card"><div class="table-head"><div><h2>用户列表</h2><span class="muted">{{ filtered.length }} 位用户</span></div><button class="ghost" @click="load">刷新</button></div><div v-if="loading" class="state">正在加载用户…</div><div v-else-if="!filtered.length" class="state"><strong>暂无匹配用户</strong><span>调整筛选条件或新建用户</span></div><table v-else><thead><tr><th>用户</th><th>角色</th><th>组织</th><th>用户状态</th><th>最近登录</th><th>操作</th></tr></thead><tbody><tr v-for="u in filtered" :key="u.id"><td><button class="user-link" @click="selected=u">{{u.name}}</button><small>{{u.email}}</small></td><td><span class="tag">{{u.role}}</span></td><td>{{u.org}}</td><td><span :class="['status',u.status]">{{u.status==='active'?'启用':'停用'}}</span></td><td>{{u.lastLogin}}</td><td class="actions"><button @click="selected=u">查看</button><button @click="openEdit(u)">编辑</button><button @click="toggle(u)">{{u.status==='active'?'停用':'启用'}}</button></td></tr></tbody></table></section>
      <section class="card trace"><div><p class="eyebrow">演示追踪</p><h2>需求 → Spec → Figma → Code → Test → Site</h2></div><div class="steps"><span class="done">01 需求</span><span class="done">02 Spec</span><span class="done">03 原型</span><span class="done">04 代码</span><span class="done">05 测试</span><span>06 发布</span></div></section>
    </main>
    <div v-if="showForm" class="modal-backdrop" @click.self="showForm=false"><form class="modal" @submit.prevent="save"><div class="modal-head"><div><p class="eyebrow">{{editing?'编辑用户':'新建用户'}}</p><h2>用户信息</h2></div><button type="button" class="close" @click="showForm=false">×</button></div><label>姓名<input v-model="form.name" /></label><label>邮箱<input v-model="form.email" type="text" /></label><label>角色<select v-model="form.role"><option v-for="r in roles" :key="r">{{r}}</option></select></label><label>组织<input v-model="form.org" /></label><div class="form-actions"><button type="button" class="ghost" @click="showForm=false">取消</button><button class="primary">保存用户</button></div></form></div>
    <div v-if="selected" class="modal-backdrop" @click.self="selected=null"><aside class="drawer"><button class="close" @click="selected=null">×</button><p class="eyebrow">用户详情</p><h2>{{selected.name}}</h2><p class="muted">{{selected.email}}</p><dl><dt>角色</dt><dd>{{selected.role}}</dd><dt>组织</dt><dd>{{selected.org}}</dd><dt>状态</dt><dd>{{selected.status==='active'?'启用':'停用'}}</dd><dt>最近登录</dt><dd>{{selected.lastLogin}}</dd></dl><button class="primary full" @click="openEdit(selected); selected=null">编辑用户</button></aside></div>
    <div v-if="toast" class="toast" @click="toast=''">{{toast}}</div>
  </div>
</template>
