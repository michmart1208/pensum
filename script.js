// 1) Malla interactiva en canvas
const canvas = document.getElementById('canvas');
const ctx    = canvas.getContext('2d');
let width, height, points = [], mouse = { x: null, y: null };

function resizeCanvas() {
  width  = canvas.width  = innerWidth;
  height = canvas.height = innerHeight;
  initPoints();
}

function initPoints() {
  points = [];
  const cols = 30, rows = 20;
  const gapX = width / cols, gapY = height / rows;
  for (let i = 0; i <= cols; i++) {
    for (let j = 0; j <= rows; j++) {
      points.push({ x: i * gapX, y: j * gapY });
    }
  }
}

function drawMesh() {
  ctx.clearRect(0, 0, width, height);
  ctx.strokeStyle = '#90caf9';
  points.forEach(p => {
    const dx   = p.x - mouse.x;
    const dy   = p.y - mouse.y;
    const dist = Math.hypot(dx, dy);
    const shift= Math.min(20, 200 / (dist + 20));
    const nx   = p.x + (dx / dist) * shift;
    const ny   = p.y + (dy / dist) * shift;

    points.forEach(q => {
      if (Math.abs(q.x - p.x) < width/30 + 1 &&
          Math.abs(q.y - p.y) < height/20 + 1) {
        ctx.beginPath();
        ctx.moveTo(nx, ny);
        ctx.lineTo(q.x, q.y);
        ctx.stroke();
      }
    });
  });
  requestAnimationFrame(drawMesh);
}

window.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

window.addEventListener('resize', resizeCanvas);

resizeCanvas();
drawMesh();


// 2) Lógica de ramos, aprobación y desbloqueo
const courses = [
  // 1er semestre
  { id:'MAT1',    name:'Matemáticas I',                             credits:4, prereqs:[] },
  { id:'QG',      name:'Química general',                           credits:4, prereqs:[] },
  { id:'BIO1',    name:'Biología I',                                credits:2, prereqs:[] },
  { id:'CEL1',    name:'Comprensión y Expresión Lingüística I',    credits:3, prereqs:[] },
  { id:'DDA',     name:'Desarrollo de destrezas para el aprendizaje', credits:2, prereqs:[] },
  { id:'LB1',     name:'Laboratorio de Biología I',                credits:1, prereqs:[] },
  { id:'EXTRA1',  name:'Extra Académica/Cultural o Deportiva',      credits:1, prereqs:[] },

  // 2do semestre
  { id:'SOC',     name:'Sociología de la Salud',                   credits:2, prereqs:[] },
  { id:'QO',      name:'Química orgánica',                         credits:3, prereqs:['QG'] },
  { id:'EG',      name:'Estadística general',                      credits:3, prereqs:[] },
  { id:'II',      name:'Inglés Instrumental',                      credits:3, prereqs:[] },
  { id:'BIO2',    name:'Biología II',                              credits:3, prereqs:['BIO1'] },
  { id:'LB2',     name:'Laboratorio de Biología II',              credits:1, prereqs:['LB1'] },
  { id:'FIS',     name:'Física médica',                            credits:3, prereqs:['MAT1'] },

  // 3er semestre
  { id:'ANAT1',   name:'Anatomía I',                                credits:7, prereqs:['BIO2','LB2'] },
  { id:'EMBR',    name:'Embriología',                               credits:3, prereqs:['BIO2','LB2'] },
  { id:'CS',      name:'Ciencias Sociales',                         credits:2, prereqs:['SOC'] },
  { id:'ITPP1',   name:'ITPP I',                                    credits:1, prereqs:['SOC'] },

  // 4to semestre
  { id:'BIOQ',    name:'Bioquímica',                                credits:6, prereqs:[] },
  { id:'ANAT2',   name:'Anatomía II',                               credits:3, prereqs:['ANAT1','EMBR'] },
  { id:'PSIE',    name:'Psicología evolutiva',                     credits:5, prereqs:['EMBR'] },
  { id:'INF',     name:'Informática',                               credits:1, prereqs:[] },
  { id:'ITPP2',   name:'ITPP II',                                   credits:1, prereqs:['ANAT1','ITPP1'] },

  // 5to semestre
  { id:'FISIO',   name:'Fisiología',                                credits:8, prereqs:['BIOQ','ANAT2'] },
  { id:'HIST',    name:'Histología',                                credits:4, prereqs:['ANAT2'] },
  { id:'EST',     name:'Estadística',                               credits:2, prereqs:['INF','CS'] },
  { id:'ITPP3',   name:'ITPP III',                                  credits:1, prereqs:['ITPP2'] },
  { id:'ELECT5',  name:'Electiva',                                  credits:1, prereqs:[] },

  // 6to semestre
  { id:'MICRO',   name:'Microbiología e inmunología clínica',      credits:5, prereqs:['FISIO','HIST'] },
  { id:'PARAS',   name:'Parasitología',                             credits:4, prereqs:['FISIO','HIST'] },
  { id:'EGA',     name:'Epidemiología general y saneamiento ambiental', credits:3, prereqs:['EST'] },
  { id:'PSIMED',  name:'Psicología médica',                        credits:6, prereqs:['PSIE'] },
  { id:'ITPP4',   name:'ITPP IV',                                   credits:1, prereqs:['ITPP3'] },
  { id:'ELECT6',  name:'Electiva',                                  credits:1, prereqs:[] },

  // 7mo semestre
  { id:'MED1',    name:'Medicina I',                               credits:6, prereqs:['MICRO','PARAS'] },
  { id:'FISIOP',  name:'Fisiopatología',                           credits:4, prereqs:['FISIO'] },
  { id:'ANATPAT', name:'Anatomía patológica',                      credits:6, prereqs:['MICRO','PARAS'] },
  { id:'PSICOP',  name:'Psicopatología',                           credits:2, prereqs:['PSIMED'] },
  { id:'GEN',     name:'Genética',                                  credits:1, prereqs:['MED1'] },

  // 8vo semestre
  { id:'CIR1',    name:'Cirugía I',                                credits:6, prereqs:['MED1','ANATPAT'] },
  { id:'GO1',     name:'Ginecología y Obstetricia I',             credits:3, prereqs:['MED1','ANATPAT'] },
  { id:'PUER',    name:'Puericultura',                             credits:2, prereqs:['PSIMED'] },
  { id:'FARM1',   name:'Farmacología I',                           credits:4, prereqs:['FISIOP'] },

  // 9no semestre
  { id:'PEDI1',   name:'Pediatría I',                              credits:6, prereqs:['PUER'] },
  { id:'MED2',    name:'Medicina II',                              credits:5, prereqs:['MED1','FISIOP'] },
  { id:'FARM2',   name:'Farmacología II',                          credits:2, prereqs:['FARM1'] },
  { id:'PSICOP2', name:'Psicopatología',                           credits:2, prereqs:['PSICOP'] },
  { id:'ELECT9',  name:'Electiva',                                  credits:1, prereqs:[] },

  // 10mo semestre
  { id:'MED3',    name:'Medicina III',                             credits:4, prereqs:['MED2','FARM2'] },
  { id:'CIR2',    name:'Cirugía II',                               credits:3, prereqs:['CIR1'] },
  { id:'GO2',     name:'Ginecología y Obstetricia II',            credits:6, prereqs:['GO1'] },
  { id:'DEONTO',  name:'Deontología médica',                       credits:1, prereqs:[] },
  { id:'ESA',     name:'Epidemiología especial',                  credits:2, prereqs:['EGA'] },

  // 11er semestre
  { id:'MED4',    name:'Medicina IV',                              credits:5, prereqs:['MED3'] },
  { id:'PEDI2',   name:'Pediatría II',                             credits:6, prereqs:['PEDI1'] },
  { id:'IMG',     name:'Imagenología',                             credits:1, prereqs:['MED2'] },
  { id:'ADMED',   name:'Administración médica',                   credits:2, prereqs:['DEONTO','ESA'] },
  { id:'MEDLEG',  name:'Medicina legal',                          credits:1, prereqs:['CIR2','GO2'] },

  // 12do semestre
  { id:'PSICLIN', name:'Psiquiatría clínica',                     credits:5, prereqs:['PSICOP2'] },
  { id:'MED5',    name:'Medicina V',                               credits:6, prereqs:['MED4'] },
  { id:'CIR3',    name:'Cirugía III',                             credits:3, prereqs:['CIR2','IMG'] },
  { id:'MEDTRAB', name:'Medicina del trabajo',                    credits:1, prereqs:['ADMED'] },
  { id:'HISTMED', name:'Historia de la medicina',                 credits:1, prereqs:[] },
  { id:'MED6',    name:'Medicina VI',                              credits:4, prereqs:['MED5'] },
  { id:'PEDI3',   name:'Pediatría III',                            credits:4, prereqs:['PEDI2'] },
  { id:'HIGY',    name:'Higiene mental y psicoterapia',           credits:1, prereqs:['PSICLIN'] },
  { id:'TRABGR',  name:'Trabajo de grado',                        credits:4, prereqs:[] },
  { id:'CIR4',    name:'Cirugía IV',                              credits:4, prereqs:['CIR3'] },
  { id:'GO3',     name:'Ginecología y Obstetricia III',           credits:4, prereqs:['GO2'] },
  { id:'PAS',     name:'Pasantía rural',                          credits:4, prereqs:['MEDTRAB'] },
];

let approved   = new Set();
let totalCreds = 0;

function updateUnlocks() {
  courses.forEach(c => {
    if (!approved.has(c.id) && c.prereqs.length) {
      const el = c.el;
      const ok = c.prereqs.every(pid => approved.has(pid));
      if (ok) el.classList.remove('locked');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('container');

  courses.forEach(c => {
    const box = document.createElement('div');
    box.classList.add('course');
    if (c.prereqs.length) box.classList.add('locked');
    box.dataset.id = c.id;
    box.innerHTML = `
      <div class="title">${c.name}</div>
      <div class="credit">${c.credits} cr</div>
      <div class="grade-container">
        <input type="number" min="0" max="100" placeholder="Nota">
      </div>
    `;

    box.addEventListener('click', () => {
      if (box.classList.contains('locked') || box.classList.contains('approved'))
        return;

      box.classList.add('approved');
      box.querySelector('.grade-container').style.display = 'block';

      totalCreds += c.credits;
      document.getElementById('credits').innerText =
        `Créditos Acumulados: ${totalCreds}`;

      approved.add(c.id);
      updateUnlocks();
    });

    c.el = box;
    container.appendChild(box);
  });
});
