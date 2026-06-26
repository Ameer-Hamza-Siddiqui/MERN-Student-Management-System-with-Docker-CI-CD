import React, { useEffect, useState } from 'react';
import { GraduationCap, Users, CalendarCheck, Trophy } from 'lucide-react';
import { api } from './services/api';

function App(){
  const [students,setStudents]=useState([]); const [attendance,setAttendance]=useState([]); const [results,setResults]=useState([]); const [search,setSearch]=useState('');
  const [student,setStudent]=useState({name:'',rollNo:'',email:'',department:'Computer Science',semester:'1',phone:''});
  const [att,setAtt]=useState({student:'',date:new Date().toISOString().slice(0,10),status:'Present'});
  const [res,setRes]=useState({student:'',subject:'',marks:'',totalMarks:100});
  const load=async()=>{ const s=await api.get('/students?search='+search); const a=await api.get('/attendance'); const r=await api.get('/results'); setStudents(s.data); setAttendance(a.data); setResults(r.data); };
  useEffect(()=>{load()},[search]);
  const submitStudent=async(e)=>{e.preventDefault(); await api.post('/students',student); setStudent({name:'',rollNo:'',email:'',department:'Computer Science',semester:'1',phone:''}); load();};
  const deleteStudent=async(id)=>{await api.delete('/students/'+id); load();};
  const markAttendance=async(e)=>{e.preventDefault(); await api.post('/attendance',att); load();};
  const addResult=async(e)=>{e.preventDefault(); await api.post('/results',res); load();};
  return <div className="layout">
    <aside><div className="brand"><GraduationCap/> StudentMS</div><a>Dashboard</a><a>Students</a><a>Attendance</a><a>Results</a></aside>
    <main>
      <section className="hero"><div><p>Modern MERN dashboard</p><h1>Student Management System</h1><span>Add students, search records, manage attendance and results.</span></div></section>
      <section className="cards"><Card icon={<Users/>} title="Students" value={students.length}/><Card icon={<CalendarCheck/>} title="Attendance" value={attendance.length}/><Card icon={<Trophy/>} title="Results" value={results.length}/></section>
      <section className="grid">
        <form className="panel" onSubmit={submitStudent}><h2>Add Student</h2>{['name','rollNo','email','phone'].map(x=><input key={x} placeholder={x} value={student[x]} onChange={e=>setStudent({...student,[x]:e.target.value})} required={x==='name'||x==='rollNo'}/>) }<input placeholder="Department" value={student.department} onChange={e=>setStudent({...student,department:e.target.value})}/><input placeholder="Semester" value={student.semester} onChange={e=>setStudent({...student,semester:e.target.value})}/><button>Add Student</button></form>
        <form className="panel" onSubmit={markAttendance}><h2>Mark Attendance</h2><select value={att.student} onChange={e=>setAtt({...att,student:e.target.value})} required><option value="">Select student</option>{students.map(s=><option key={s._id} value={s._id}>{s.name}</option>)}</select><input type="date" value={att.date} onChange={e=>setAtt({...att,date:e.target.value})}/><select value={att.status} onChange={e=>setAtt({...att,status:e.target.value})}><option>Present</option><option>Absent</option></select><button>Save Attendance</button></form>
        <form className="panel" onSubmit={addResult}><h2>Add Result</h2><select value={res.student} onChange={e=>setRes({...res,student:e.target.value})} required><option value="">Select student</option>{students.map(s=><option key={s._id} value={s._id}>{s.name}</option>)}</select><input placeholder="Subject" value={res.subject} onChange={e=>setRes({...res,subject:e.target.value})}/><input type="number" placeholder="Marks" value={res.marks} onChange={e=>setRes({...res,marks:e.target.value})}/><button>Add Result</button></form>
      </section>
      <section className="panel"><div className="table-head"><h2>Students</h2><input placeholder="Search student..." value={search} onChange={e=>setSearch(e.target.value)}/></div><table><thead><tr><th>Name</th><th>Roll No</th><th>Department</th><th>Semester</th><th>Action</th></tr></thead><tbody>{students.map(s=><tr key={s._id}><td>{s.name}</td><td>{s.rollNo}</td><td>{s.department}</td><td>{s.semester}</td><td><button className="danger" onClick={()=>deleteStudent(s._id)}>Delete</button></td></tr>)}</tbody></table></section>
      <section className="two"><div className="panel"><h2>Attendance</h2>{attendance.map(a=><p key={a._id}>{a.student?.name} - {a.date} - <b>{a.status}</b></p>)}</div><div className="panel"><h2>Results</h2>{results.map(r=><p key={r._id}>{r.student?.name} - {r.subject}: {r.marks}/{r.totalMarks} Grade {r.grade}</p>)}</div></section>
    </main>
  </div>
}
function Card({icon,title,value}){return <div className="card">{icon}<div><p>{title}</p><h2>{value}</h2></div></div>}
export default App;
