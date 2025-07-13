// Definición de ramos con semestres, créditos y dependencias
const ramos = {
  "Matemáticas I": {sem:1,cr:4, deps: [], opens:["Física medica"]},
  "Química general": {sem:1,cr:4, deps: [], opens:["Química orgánica"]},
  "Biología I": {sem:1,cr:2, deps: [], opens:["Biología II"]},
  "Comprensión y Expresión Lingüística I": {sem:1,cr:3, deps: []},
  "Desarrollo de destrezas para el aprendizaje": {sem:1,cr:2, deps: []},
  "Laboratorio de Biología I": {sem:1,cr:1, deps: [], opens:["Laboratorio de Biología II"]},
  "Extra Académica Cultural o Deportiva": {sem:1,cr:1, deps: []},
  "Sociología de la Salud": {sem:2,cr:2, deps: [], opens:["Ciencias Sociales","ITPP I"]},
  "Química orgánica": {sem:2,cr:3, deps:["Química general"]},
  "Estadística general": {sem:2,cr:3, deps: []},
  "Inglés Instrumental": {sem:2,cr:3, deps: []},
  "Biología II": {sem:2,cr:3, deps:["Biología I"]},
  "Laboratorio de Biología II": {sem:2,cr:1, deps:["Laboratorio de Biología I"]},
  "Física medica": {sem:2,cr:3, deps:["Matemáticas I"]},
  "Anatomía I": {sem:3,cr:7, deps:["Biología II","Laboratorio de Biología II"], opens:["Anatomía II","ITPP II"]},
  "Embriología": {sem:3,cr:3, deps:["Biología II","Laboratorio de Biología II"], opens:["Anatomía II","Psicología evolutiva"]},
  "Ciencias Sociales": {sem:3,cr:2, deps:["Sociología de la Salud"]},
  "ITPP I": {sem:3,cr:1, deps:["Sociología de la Salud"], opens:["ITPP II"]},
  "Bioquímica": {sem:4,cr:6, deps:[], opens:["Fisiología"]},
  "Anatomía II": {sem:4,cr:3, deps:["Anatomía I","Embriología"], opens:["Fisiología","Histología"]},
  "Psicología evolutiva": {sem:4,cr:5, deps:["Embriología"], opens:["Psicología medica"]},
  "Informática": {sem:4,cr:1, deps:[], opens:["Estadística general"]},
  "ITPP II": {sem:4,cr:1, deps:["ITPP I"], opens:["ITPP III"]},
  "Fisiología": {sem:5,cr:8, deps:["Bioquímica","Anatomía II"], opens:["Microbiología e inmunología clínica","Fisiopatología","Parasitología","Psicología medica"]},
  "Histología": {sem:5,cr:4, deps:["Anatomía II"], opens:["Microbiología e inmunología clínica","Fisiopatología","Parasitología"]},
  "Estadística": {sem:5,cr:2, deps:["Informática","Estadística general"], opens:["Epidemiologia general y saneamiento ambiental"]},
  "ITPP III": {sem:5,cr:1, deps:["ITPP II"], opens:["ITPP IV"]},
  "Electiva": {sem:5,cr:1, deps:[]},
  "Microbiología e inmunología clínica": {sem:6,cr:5, deps:["Fisiología","Histología"], opens:["Medicina I","Anatomía patológica"]},
  "Parasitología": {sem:6,cr:4, deps:["Fisiología","Histología"], opens:["Medicina I","Anatomía patológica"]},
  "Epidemiologia general y saneamiento ambiental": {sem:6,cr:3, deps:["Estadística"], opens:["Epidemiologia especial"]},
  "Psicología medica": {sem:6,cr:6, deps:["Fisiología","Psicología evolutiva"], opens:["Puericultura","Psicopatología"]},
  "ITPP IV": {sem:6,cr:1, deps:["ITPP III"]},
  "Medicina I": {sem:7,cr:6, deps:["Microbiología e inmunología clínica","Parasitología"], opens:["Cirugía I","Ginecología y Obstetricia I","Puericultura","Psicopatología","Medicina II","Genética"]},
  "Fisiopatología": {sem:7,cr:4, deps:["Fisiología"], opens:["Farmacología I","Medicina II"]},
  "Anatomía patológica": {sem:7,cr:6, deps:["Microbiología e inmunología clínica","Parasitología"], opens:["Cirugía I","Ginecología y Obstetricia I"]},
  "Cirugía I": {sem:8,cr:6, deps:["Medicina I","Anatomía patológica"], opens:["Cirugía II"]},
  "Ginecología y Obstetricia I": {sem:8,cr:3, deps:["Medicina I","Anatomía patológica"], opens:["Ginecología y Obstetricia II"]},
  "Puericultura": {sem:8,cr:2, deps:["Psicología medica","Medicina I"], opens:["Pediatría I"]},
  "Farmacología I": {sem:8,cr:4, deps:["Fisiopatología"], opens:["Farmacología II"]},
  "Genética": {sem:8,cr:1, deps:["Medicina I"]},
  "Pediatría I": {sem:9,cr:6, deps:["Puericultura"], opens:["Pediatría II"]},
  "Medicina II": {sem:9,cr:5, deps:["Medicina I","Fisiopatología"], opens:["Medicina III","Imagenología"]},
  "Farmacología II": {sem:9,cr:2, deps:["Farmacología I"], opens:["Medicina III"]},
  "Psicopatología": {sem:9,cr:2, deps:["Psicología medica","Medicina I"], opens:["Psiquiatría clínica"]},
  "Electiva 9": {sem:9,cr:1, deps:[]},
  "Medicina III": {sem:10,cr:4, deps:["Medicina II","Farmacología II"], opens:["Medicina IV"]},
  "Cirugía II": {sem:10,cr:3, deps:["Cirugía I"], opens:["Medicina legal","Cirugía III"]},
  "Ginecología y Obstetricia II": {sem:10,cr:6, deps:["Ginecología y Obstetricia I"], opens:["Medicina legal"]},
  "Deontología medica": {sem:10,cr:1, deps:[]},
  "Epidemiologia especial": {sem:10,cr:2, deps:["Epidemiologia general y saneamiento ambiental"], opens:["Administración medica"]},
  "Medicina IV": {sem:11,cr:5, deps:["Medicina III"], opens:["Medicina V"]},
  "Pediatría II": {sem:11,cr:6, deps:["Pediatría I"], opens:["Pediatría III"]},
  "Imagenología": {sem:11,cr:1, deps:["Medicina II"], opens:["Cirugía III"]},
  "Administración medica": {sem:11,cr:2, deps:["Epidemiologia especial"], opens:["Medicina del trabajo"]},
  "Medicina legal": {sem:11,cr:1, deps:["Cirugía II","Ginecología y Obstetricia II"]},
  "Psiquiatría clínica": {sem:12,cr:5, deps:["Psicopatología"], opens:["Higiene mental y psicoterapia"]},
  "Medicina V": {sem:12,cr:6, deps:["Medicina IV"], opens:["Medicina VI"]},
  "Cirugía III": {sem:12,cr:3, deps:["Cirugía II","Imagenología"], opens:["Cirugía IV"]},
  "Medicina del trabajo": {sem:12,cr:1, deps:["Administración medica"], opens:["Pasantía rural"]},
  "Historia de la medicina": {sem:12,cr:1, deps:[]},
  "Medicina VI": {sem:13,cr:4, deps:["Medicina V"]},
  "Pediatría III": {sem:13,cr:6, deps:["Pediatría II"]},
  "Higiene mental y psicoterapia": {sem:13,cr:1, deps:["Psiquiatría clínica"]},
  "Trabajo de grado": {sem:13,cr:4, deps:[]},
  "Cirugía IV": {sem:13,cr:4, deps:["Cirugía III"]},
  "Ginecología y Obstetricia III": {sem:13,cr:4, deps:["Ginecología y Obstetricia II"]},
  "Pasantía rural": {sem:13,cr:4, deps:["Medicina del trabajo"]}
};

const total = {creditos: 0, sumaNotas: 0, contNotas: 0};

function construirMalla() {
  const cont = document.getElementById('malla');
  for (let sem =1; sem<=13; sem++) {
    const caja = document.createElement('div');
    caja.className='semestre';
    caja.innerHTML = `<h2>${sem}${sem===13?' (Internado Rotatorio)':''} Semestre</h2>`;
    Object.entries(ramos)
      .filter(([n,v]) => v.sem===sem)
      .forEach(([n,v]) => {
        const r = document.createElement('div');
        r.className='ramo bloqueado';
        r.innerHTML=`${n} (${v.cr}cr)`;
        r.onclick =()=> toggleAprobado(r,n);
        caja.appendChild(r);
      });
    cont.appendChild(caja);
  }
}

function toggleAprobado(el, nombre) {
  const datos = ramos[nombre];
  if (el.classList.contains('bloqueado')) return;
  if (el.classList.contains('aprobado')) return;
  // Aprobar
  el.classList.add('aprobado');
  const inputNota = document.createElement('input');
  inputNota.className='nota';
  inputNota.type='number'; inputNota.min=0; inputNota.max=7; inputNota.step=0.1;
  inputNota.placeholder='nota';
  inputNota.onchange = e => { actualizaNota(nombre, parseFloat(e.target.value)); };
  el.appendChild(inputNota);
  // sumar créditos
  total.creditos+= datos.cr;
  document.getElementById('totalCreditos').innerText = total.creditos;
  // desbloquear dependientes
  if (datos.opens) datos.opens.forEach(dep=> desbloquear(dep));
}

function desbloquear(nombre) {
  document.querySelectorAll('.ramo').forEach(el=>{
    if (el.textContent.startsWith(nombre)) {
      el.classList.remove('bloqueado');
    }
  });
}

function actualizaNota(nombre, nota) {
  if (isNaN(nota)) return;
  total.sumaNotas += nota;
  total.contNotas++;
  document.getElementById('promedioNotas').innerText = (total.sumaNotas/total.contNotas).toFixed(2);
}

// inicializar
window.onload = ()=>{
  construirMalla();
  // desbloquear ramos del primer semestre
  Object.entries(ramos).forEach(([n,v])=>{
    if (v.sem===1 ) desbloquear(n);
  });
};
