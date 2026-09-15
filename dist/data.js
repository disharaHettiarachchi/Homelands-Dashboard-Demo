/* Deterministic fictional demonstration records. No customer recordings or personal data. */
(()=>{
let seed=260912;const rand=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
const supervisors=[{id:'sup-1',name:'Nadeesha Perera',team:'Colombo Central',initials:'NP',color:'#176f76'},{id:'sup-2',name:'Kasun Fernando',team:'Western Region',initials:'KF',color:'#6657a3'},{id:'sup-3',name:'Tharushi Silva',team:'Growth Team',initials:'TS',color:'#ac593b'}];
const names=['Anjali Senanayake','Dilan Jayawardena','Ishara Perera','Ravindu Silva','Nethmi Fernando','Sahan Wickramasinghe','Dinithi Rajapaksha','Amila Kumara','Kavindi De Silva','Tharindu Bandara','Chamodi Herath','Lahiru Madushanka'];
const bases=[.92,.87,.85,.77,.89,.83,.79,.72,.88,.81,.75,.68];
const agents=names.map((name,i)=>({id:'a-'+(i+1),name,supervisorId:supervisors[Math.floor(i/4)].id,initials:name.split(' ').map(x=>x[0]).slice(0,2).join(''),base:bases[i]}));
const criteria=[['greeting','Warm Wishes & Company Introduction',3],['usps','Describe Project USPs',3],['site_visit','Pitch any type of site visits',3],['closure','Positive Closure',3],['communication','Great Communication Skills',3],['tone','Pleasant Voice Tone',3],['location','Describe Project Location',3],['language','Relatable Language',4],['convincing','Fast Convincing',4],['adaptation','Collaborative & Adaptive Skills',4],['profiling','5-Factor Customer Profiling',5]].map(([id,name,max])=>({id,name,max}));
const projects=['Athurugiriya Gardens','Piliyandala Residences','Malabe Green','Gampaha Heights'];
const calls=[];let serial=2400;
for(let day=0;day<56;day++)for(const agent of agents){const count=3+Math.floor(rand()*3);for(let k=0;k<count;k++){
const date=new Date(Date.UTC(2026,6,19+day,3+Math.floor(rand()*8),Math.floor(rand()*60)));const recent=day>=28;const level=agent.base+(recent?.03:0)+(rand()-.5)*.18;const review=rand()<.075;const mismatch=rand()<.19;const greeting=review&&rand()<.45?'unverifiable':rand()<agent.base+.06?'approved':rand()<.45?'delayed':'partial';
const scores=criteria.map(c=>{let target=level;if(['profiling','site_visit','usps'].includes(c.id))target-=.11;if(c.id==='language'||c.id==='tone')target+=.09;let points=Math.max(0,Math.min(c.max,Math.floor(target*c.max+rand())));let status='scored';if(c.id==='greeting')points=({approved:3,delayed:2,partial:1,unverifiable:0})[greeting];if(c.id==='site_visit'&&mismatch){status='not_applicable';points=null;}if(review&&(['tone','convincing','usps'].includes(c.id)||(c.id==='greeting'&&greeting==='unverifiable'))){status='insufficient_evidence';points=null;}return{id:c.id,points,max:c.max,status};});
const assessed=scores.filter(s=>s.status==='scored');const max=assessed.reduce((s,c)=>s+c.max,0),earned=assessed.reduce((s,c)=>s+c.points,0);const start=Math.floor(rand()*3)-1;const finish=Math.max(-1,Math.min(1,start+(rand()<level-.18?1:rand()<.4?-1:0)));const outcome=mismatch?'Budget mismatch':rand()<.36?'Site visit agreed':rand()<.65?'Follow-up agreed':'Information only';
calls.push({id:'HL-D'+serial++,agentId:agent.id,supervisorId:agent.supervisorId,date:date.toISOString(),duration:110+Math.floor(rand()*520),language:rand()<.72?'Sinhala / English':rand()<.6?'English':'Tamil / English',project:projects[Math.floor(rand()*projects.length)],scores,earned,max,quality:review?null:100*earned/max,review,greeting,start,finish,outcome});
}}
window.HL={supervisors,agents,criteria,calls,end:'2026-09-13T00:00:00.000Z'};
})();
