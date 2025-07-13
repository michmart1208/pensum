// ====== 1) Malla interactiva en canvas ======
const canvas  = document.getElementById('canvas');
const ctx     = canvas.getContext('2d');
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
    const dx = p.x - mouse.x, dy = p.y - mouse.y;
    const dist = Math.hypot(dx, dy);
    const shift = Math.min(20, 200 / (dist + 20));
    const nx = p.x + (dx / dist) * shift;
    const ny = p.y + (dy / dist) * shift;

    points.forEach(q => {
      if (Math.abs(q.x - p.x) < gapX + 1 && Math.abs(q.y - p.y) < gapY + 1) {
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


// ====== 2) Lógica de aprobación y desbloqueo de ramos ======
const courses = [
  /* Semestre 1 */
  { id:'MAT1',    name:'Matematicas I',                                credits:4, prereqs:[] },
  { id:'QG',      name:'Quimica general',                              credits:4, prereqs:[] },
  { id:'BIO1',    name:'Biologia I',                                    credits:2, prereqs:[] },
  { id:'CEL1',    name:'Compr. y Exp. Lingüística I',                  credits:3, prereqs:[] },
  { id:'DDA',     name:'Desarrollo de destrezas para el aprendizaje', credits:2, prereqs:[] },
  { id:'LBIO1',   name:'Laboratorio de Biologia I',                    credits:1, prereqs:[] },
  { id:'EXTRA1',  name:'Extra Académica / Cultural o Deportiva',       credits:1, prereqs:[] },

  /* Semestre 2 */
  { id:'SOC',     name:'Sociologia de la Salud',                       credits:2, prereqs:[] },
  { id:'QO',      name:'Quimica organica',                             credits:3, prereqs:['QG'] },
  { id:'EG',      name:'Estadistica general',                          credits:3, prereqs:[] },
  { id:'II',      name:'Ingles Instrumental',                          credits:3, prereqs:[] },
  { id:'BIO2',    name:'Biologia II',                                   credits:3, prereqs:['BIO1'] },
  { id:'LBIO2',   name:'Laboratorio de Biologia II',                   credits:1, prereqs:['LBIO1'] },
  { id:'FM',      name:'Fisica medica',                                credits:3, prereqs:['MAT1'] },

  /* Semestre 3 */
  { id:'ANAT1',   name:'Anatomia I',                                   credits:7, prereqs:['BIO2','LBIO2'] },
  { id:'EMBR',    name:'Embriologia',                                  credits:3, prereqs:['BIO2','LBIO2'] },
  { id:'CS',      name:'Ciencias Sociales',                            credits:2, prereqs:['SOC'] },
  { id:'ITPP1',   name:'ITPP I',                                       credits:1, prereqs:['SOC'] },

  /* Semestre 4 */
  { id:'BIOQ',    name:'Bioquimica',                                   credits:6, prereqs:[] },
  { id:'ANAT2',   name:'Anatomia II',                                  credits:3, prereqs:['ANAT1','EMBR'] },
  { id:'PSIEV',   name:'Psicologia evolutiva',                        credits:5, prereqs:['EMBR'] },
  { id:'INF',     name:'Informatica',                                  credits:1, prereqs:[] },
  { id:'ITPP2',   name:'ITPP II',                                      credits:1, prereqs:['ANAT1','ITPP1'] },

  /* Semestre 5 */
  { id:'FIS',     name:'Fisiologia',                                   credits:8, prereqs:['BIOQ','ANAT2'] },
  { id:'HIST',    name:'Histologia',                                   credits:4, prereqs:['ANAT2'] },
  { id:'EST',     name:'Estadistica',                                  credits:2, prereqs:['CS','INF'] },
  { id:'ITPP3',   name:'ITPP III',                                     credits:1, prereqs:['ITPP2'] },
  { id:'ELECT1',  name:'Electiva',                                     credits:1, prereqs:[] },

  /* Semestre 6 */
  { id:'MICRO',   name:'Microbiologia e inmunología clínica',         credits:5, prereqs:['FIS','HIST'] },
  { id:'PARASIT', name:'Parasitologia',                                credits:4, prereqs:['FIS','HIST'] },
  { id:'EGA',     name:'Epidemiología general y saneamiento ambiental', credits:3, prereqs:['EST'] },
  { id:'PSIMED',  name:'Psicologia médica',                            credits:6, prereqs:['PSIEV'] },
  { id:'ITPP4',   name:'ITPP IV',                                      credits:1, prereqs:['ITPP3'] },
  { id:'ELECT2',  name:'Electiva',                                     credits:1, prereqs:[] },

  /* Semestre 7 */
  { id:'MED1',    name:'Medicina I',                                   credits:6, prereqs:['MICRO','PARASIT'] },
  { id:'FISIOP',  name:'Fisiopatologia',                               credits:4, prereqs:['FIS'] },
  { id:'ANATPAT', name:'Anatomia patologica',                          credits:6, prereqs:['MICRO','PARASIT'] },
  { id:'PSICOP',  name:'Psicopatologia',                               credits:2, prereqs:['PSIMED'] },
  { id:'GEN',     name:'Genetica',                                     credits:1, prereqs:['MED1'] },

  /* Semestre 8 */
  { id:'CIR1',    name:'Cirugia I',                                    credits:6, prereqs:['MED1','ANATPAT'] },
  { id:'GO1',     name:'Ginecologia y Obstetricia I',                credits:3, prereqs:['MED1','ANATPAT'] },
  { id:'PUER',    name:'Puericultura',                                 credits:2, prereqs:['PSIMED'] },
  { id:'FARM1',   name:'Farmacologia I',                               credits:4, prereqs:['FISIOP'] },
  { id:'GEN2',    name:'Genetica',                                     credits:1, prereqs:['MED1'] },

  /* Semestre 9 */
  { id:'PEDI1',   name:'Pediatria I',                                  credits:6, prereqs:['PUER'] },
  { id:'MED2',    name:'Medicina II',                                  credits:5, prereqs:['MED1','FISIOP'] },
  { id:'FARM2',   name:'Farmacologia II',                              credits:2, prereqs:['FARM1'] },
  { id:'PSICOP2', name:'Psicopatologia',                               credits:2, prereqs:['PSICOP'] },
  { id:'ELECT3',  name:'Electiva',                                     credits:1, prereqs:[] },

  /* Semestre 10 */
  { id:'MED3',    name:'Medicina III',                                 credits:4, prereqs:['MED2','FARM2'] },
  { id:'CIR2',    name:'Cirugia II',                                   credits:3, prereqs:['CIR1'] },
  { id:'GO2',     name:'Ginecologia y Obstetricia II',               credits:6, prereqs:['GO1'] },
  { id:'DEONTO',  name:'Deontologia medica',                          credits:1, prereqs:[] },
  { id:'ESA',     name:'Epidemiologia especial',                      credits:2, prereqs:['EGA'] },

  /* Semestre 11 */
  { id:'MED4',    name:'Medicina IV',                                  credits:5, prereqs:['MED3'] },
  { id:'PEDI2',   name:'Pediatria II',                                 credits:6, prereqs:['PEDI1'] },
  { id:'IMG',     name:'Imagenologia',                                 credits:1, prereqs:['MED2'] },
  { id:'ADMED',   name:'Administracion medica',                       credits:2, prereqs:['DEONTO','ESA'] },
  { id:'MEDLEG',  name:'Medicina legal',                              credits:1, prereqs:['CIR2','GO2'] },

  /* Semestre 12 */
  { id:'PSICLIN', name:'Psiquiatria clinica',                         credits:5, prereqs:['PSICOP2'] },
  { id:'MED5',    name:'Medicina V',                                   credits:6, prereqs:['MED4'] },
  { id:'CIR3',    name:'Cirugia III',                                 credits:3, prereqs:['CIR2','IMG'] },
  { id:'MEDTRAB', name:'Medicina del trabajo',                        credits:1, prereqs:['ADMED'] },
  { id:'HISTMED', name:'Historia de la medicina',                     credits:1, prereqs:[] },
  { id:'MED6',    name:'Medicina VI',                                  credits:4, prereqs:['MED5'] },
  { id:'PEDI3',   name:'Pediatria III',                               credits:4, prereqs:['PEDI2'] },
  { id:'HIGYM',   name:'Higiene mental y psicoterapia',               credits:1, prereqs:['PSICLIN'] },
  { id:'TRABGR',  name:'Trabajo de grado',                            credits:4, prereqs:[] },
  { id:'CIR4',    name:'Cirugia IV',                                  credits:4, prereqs:['CIR3'] },
  { id:'GO3',     name:'Ginecologia y Obstetricia III',              credits:4, prereqs:['GO2'] },
  { id:'PAS',     name:'Pasantia rural',                              credits:4, prereqs:['MEDTRAB'] }
];

let approved   = new Set();
let totalCreds = 0;

function updateUnlocks() {
  courses.forEach(c => {
    if (c.prereqs.length > 0 && !approved.has(c.id)) {
      const el = c.element;
      const ok = c.prereqs.every(pid => approved.has(pid));
      if (ok) {
        el.classList.remove('locked');
        el.classList.add('unlocked');
      }
    }
  });
}

window.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('container');

  courses.forEach(c => {
    // crear caja
    const box = document.createElement('div');
    box.classList.add('course');
    if (c.prereqs.length) box.classList.add('locked');
    else                 box.classList.add('unlocked');
    box.dataset.id = c.id;

    // contenido
    box.innerHTML = `
      <div class="title">${c.name}</div>
      <div class="credit">${c.credits} cr</div>
      <div class="grade-container" style="display:none;">
        <input type="number" min="0" max="100" placeholder="Nota">
      </div>
    `;

    // evento de click
    box.addEventListener('click', () => {
      if (box.classList.contains('locked') || box.classList.contains('approved'))
        return;

      // aprobar ramo
      box.classList.add('approved');
      box.classList.remove('unlocked');
      box.querySelector('.grade-container').style.display = 'block';

      totalCreds += c.credits;
      document.getElementById('credits').innerText =
        'Créditos Acumulados: ' + totalCreds;

      approved.add(c.id);
      updateUnlocks();
    });

    c.element = box;
    container.appendChild(box);
  });
});
