// courses con semestres, créditos y prerrequisitos
const courses = [
  // 1er sem.
  { id:'MAT1', name:'Matemáticas I',        credits:4, sem:1, prereqs:[] },
  { id:'QG',   name:'Química general',       credits:4, sem:1, prereqs:[] },
  { id:'BIO1', name:'Biología I',            credits:2, sem:1, prereqs:[] },
  { id:'CEL1', name:'Comprensión y Expresión Lingüística I', credits:3, sem:1, prereqs:[] },
  { id:'DDA',  name:'Desarrollo de destrezas', credits:2, sem:1, prereqs:[] },
  { id:'LB1',  name:'Laboratorio de Biología I', credits:1, sem:1, prereqs:[] },
  { id:'EX1',  name:'Extra Académica/Cultural', credits:1, sem:1, prereqs:[] },
  // 2do sem.
  { id:'SOC',  name:'Sociología de la Salud', credits:2, sem:2, prereqs:[] },
  { id:'QO',   name:'Química orgánica',      credits:3, sem:2, prereqs:['QG'] },
  { id:'EG',   name:'Estadística general',   credits:3, sem:2, prereqs:[] },
  { id:'II',   name:'Inglés Instrumental',   credits:3, sem:2, prereqs:[] },
  { id:'BIO2', name:'Biología II',           credits:3, sem:2, prereqs:['BIO1'] },
  { id:'LB2',  name:'Laboratorio de Biología II', credits:1, sem:2, prereqs:['LB1'] },
  { id:'FM',   name:'Física médica',          credits:3, sem:2, prereqs:['MAT1'] },
  // 3er sem.
  { id:'AN1',  name:'Anatomía I',            credits:7, sem:3, prereqs:['BIO2','LB2'] },
  { id:'EMB',  name:'Embriología',           credits:3, sem:3, prereqs:['BIO2','LB2'] },
  { id:'CS',   name:'Ciencias Sociales',     credits:2, sem:3, prereqs:['SOC'] },
  { id:'IT1',  name:'ITPP I',                credits:1, sem:3, prereqs:['SOC'] },
  // 4to sem.
  { id:'BIOQ', name:'Bioquímica',            credits:6, sem:4, prereqs:[] },
  { id:'AN2',  name:'Anatomía II',           credits:3, sem:4, prereqs:['AN1','EMB'] },
  { id:'PE',   name:'Psicología evolutiva',  credits:5, sem:4, prereqs:['EMB'] },
  { id:'INF',  name:'Informática',           credits:1, sem:4, prereqs:[] },
  { id:'IT2',  name:'ITPP II',               credits:1, sem:4, prereqs:['AN1','IT1'] },
  // 5to sem.
  { id:'FIS',  name:'Fisiología',            credits:8, sem:5, prereqs:['BIOQ','AN2'] },
  { id:'HIS',  name:'Histología',            credits:4, sem:5, prereqs:['AN2'] },
  { id:'ES',   name:'Estadística',           credits:2, sem:5, prereqs:['INF','CS'] },
  { id:'IT3',  name:'ITPP III',              credits:1, sem:5, prereqs:['IT2'] },
  { id:'EL5',  name:'Electiva',              credits:1, sem:5, prereqs:[] },
  // 6to sem.
  { id:'MIC',  name:'Microbiología e inmunología clínica', credits:5, sem:6, prereqs:['FIS','HIS'] },
  { id:'PAR',  name:'Parasitología',         credits:4, sem:6, prereqs:['FIS','HIS'] },
  { id:'EGA',  name:'Epid. gen. y saneamiento amb.', credits:3, sem:6, prereqs:['ES'] },
  { id:'PM',   name:'Psicología médica',     credits:6, sem:6, prereqs:['PE'] },
  { id:'IT4',  name:'ITPP IV',               credits:1, sem:6, prereqs:['IT3'] },
  { id:'EL6',  name:'Electiva',              credits:1, sem:6, prereqs:[] },
  // 7mo sem.
  { id:'M1',   name:'Medicina I',            credits:6, sem:7, prereqs:['MIC','PAR'] },
  { id:'FIOP', name:'Fisiopatología',        credits:4, sem:7, prereqs:['FIS'] },
  { id:'ANP',  name:'Anatomía patológica',    credits:6, sem:7, prereqs:['MIC','PAR'] },
  { id:'PSI',  name:'Psicopatología',         credits:2, sem:7, prereqs:['PM'] },
  { id:'GEN',  name:'Genética',              credits:1, sem:7, prereqs:['M1'] },
  // 8vo sem.
  { id:'C1',   name:'Cirugía I',             credits:6, sem:8, prereqs:['M1','ANP'] },
  { id:'GO1',  name:'Ginecología y Obstetricia I', credits:3, sem:8, prereqs:['M1','ANP'] },
  { id:'PU',   name:'Puericultura',           credits:2, sem:8, prereqs:['PM'] },
  { id:'F1',   name:'Farmacología I',         credits:4, sem:8, prereqs:['FIOP'] },
  { id:'GEN2', name:'Genética',              credits:1, sem:8, prereqs:['M1'] },
  // 9no sem.
  { id:'P1',   name:'Pediatría I',           credits:6, sem:9, prereqs:['PU'] },
  { id:'M2',   name:'Medicina II',           credits:5, sem:9, prereqs:['M1','FIOP'] },
  { id:'F2',   name:'Farmacología II',        credits:2, sem:9, prereqs:['F1'] },
  { id:'PS2',  name:'Psicopatología',         credits:2, sem:9, prereqs:['PSI'] },
  { id:'EL9',  name:'Electiva',              credits:1, sem:9, prereqs:[] },
  // 10mo sem.
  { id:'M3',   name:'Medicina III',          credits:4, sem:10, prereqs:['M2','F2'] },
  { id:'C2',   name:'Cirugía II',            credits:3, sem:10, prereqs:['C1'] },
  { id:'GO2',  name:'Ginecología y Obstetricia II', credits:6, sem:10, prereqs:['GO1'] },
  { id:'DE',   name:'Deontología médica',     credits:1, sem:10, prereqs:[] },
  { id:'ES2',  name:'Epidemiología especial', credits:2, sem:10, prereqs:['EGA'] },
  // 11er sem.
  { id:'M4',   name:'Medicina IV',           credits:5, sem:11, prereqs:['M3'] },
  { id:'P2',   name:'Pediatría II',          credits:6, sem:11, prereqs:['P1'] },
  { id:'IMG',  name:'Imagenología',          credits:1, sem:11, prereqs:['M2'] },
  { id:'AD',   name:'Administración médica', credits:2, sem:11, prereqs:['DE','ES2'] },
  { id:'ML',   name:'Medicina legal',        credits:1, sem:11, prereqs:['C2','GO2'] },
  // 12do sem.
  { id:'PSI2', name:'Psiquiatría clínica',   credits:5, sem:12, prereqs:['PS2'] },
  { id:'M5',   name:'Medicina V',            credits:6, sem:12, prereqs:['M4'] },
  { id:'C3',   name:'Cirugía III',           credits:3, sem:12, prereqs:['C2','IMG'] },
  { id:'MT',   name:'Medicina del trabajo',  credits:1, sem:12, prereqs:['AD'] },
  { id:'HM',   name:'Historia de la medicina', credits:1, sem:12, prereqs:[] },
  // Internado
  { id:'M6',   name:'Medicina VI',           credits:4, sem:13, prereqs:['M5'] },
  { id:'P3',   name:'Pediatría III',         credits:4, sem:13, prereqs:['P2'] },
  { id:'HY',   name:'Higiene mental y psicoterapia', credits:1, sem:13, prereqs:['PSI2'] },
  { id:'TG',   name:'Trabajo de grado',      credits:4, sem:13, prereqs:[] },
  { id:'C4',   name:'Cirugía IV',            credits:4, sem:13, prereqs:['C3'] },
  { id:'GO3',  name:'Ginecología y Obstetricia III', credits:4, sem:13, prereqs:['GO2'] },
  { id:'PAS',  name:'Pasantía rural',        credits:4, sem:13, prereqs:['MT'] }
];

let approved = new Set();
let totalCredits = 0;
let grades = [];

// dimensionar canvas
const canvas = document.getElementById('arrowCanvas');
const ctx    = canvas.getContext('2d');
function resize() {
  canvas.width = window.innerWidth;
  canvas.height= window.innerHeight;
  drawArrows();
}
window.addEventListener('resize', resize);

// generación de la UI
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('container');

  // agrupar por semestres
  const maxSem = Math.max(...courses.map(c=>c.sem));
  for (let s=1; s<=maxSem; s++) {
    const row = document.createElement('div');
    row.className = 'semester-row';
    courses.filter(c=>c.sem===s).forEach(c => {
      const box = document.createElement('div');
      box.className = 'course' + (c.prereqs.length? ' locked':'');
      box.id = c.id;
      box.innerHTML = `
        <div class="title">${c.name}</div>
        <div class="credit">${c.credits} cr</div>
        <div class="grade-container">
          <input type="number" min="0" max="100" placeholder="Nota">
        </div>
      `;
      // click aprobar
      box.addEventListener('click', () => {
        if (box.classList.contains('locked') || box.classList.contains('approved'))
          return;
        box.classList.add('approved');
        box.querySelector('.grade-container').style.display = 'block';
        approved.add(c.id);
        totalCredits += c.credits;
        document.getElementById('credits').innerText = `Créditos: ${totalCredits}`;
        // nota
        const inp = box.querySelector('input');
        inp.addEventListener('change', () => {
          const v = parseFloat(inp.value);
          if (!isNaN(v)) {
            grades = grades.filter(g=>g.id!==c.id);
            grades.push({id:c.id, val:v});
            const avg = grades.reduce((a,b)=>a+b.val,0)/grades.length;
            document.getElementById('average').innerText = `Promedio: ${avg.toFixed(2)}`;
          }
        });
        unlock();
        drawArrows();
      });
      container.appendChild(box);
    });
    container.appendChild(row);
  }
  resize();
  drawArrows();
});

// desbloquear según prerrequisitos
function unlock() {
  courses.forEach(c => {
    if (!approved.has(c.id) && c.prereqs.length>0) {
      const ok = c.prereqs.every(pid => approved.has(pid));
      if (ok) document.getElementById(c.id).classList.remove('locked');
    }
  });
}

// dibujar flechas en canvas
function drawArrows() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.strokeStyle = '#90CAF9';
  ctx.fillStyle = '#90CAF9';
  ctx.lineWidth = 2;

  courses.forEach(c => {
    c.prereqs.forEach(pid => {
      const from = document.getElementById(pid).getBoundingClientRect();
      const to   = document.getElementById(c.id).getBoundingClientRect();
      const x1 = from.left + from.width/2;
      const y1 = from.bottom;
      const x2 = to.left + to.width/2;
      const y2 = to.top;
      // línea
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      // flecha
      const angle = Math.atan2(y2-y1, x2-x1);
      const headlen = 8;
      ctx.beginPath();
      ctx.moveTo(x2, y2);
      ctx.lineTo(x2 - headlen * Math.cos(angle - Math.PI/6),
                 y2 - headlen * Math.sin(angle - Math.PI/6));
      ctx.lineTo(x2 - headlen * Math.cos(angle + Math.PI/6),
                 y2 - headlen * Math.sin(angle + Math.PI/6));
      ctx.lineTo(x2, y2);
      ctx.fill();
    });
  });
}
