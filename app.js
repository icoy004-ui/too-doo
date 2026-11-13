// To-Do List sederhana: tambah, centang, hapus, filter, simpan di localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';

const input = document.getElementById('taskInput');
const list = document.getElementById('taskList');
const counter = document.getElementById('counter');

function save() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
  const text = input.value.trim();
  if (text === '') {
    alert('Tugas tidak boleh kosong');
    return;
  }
  tasks.push({ id: Date.now(), text: text, done: false });
  input.value = '';
  save();
  render();
}

function toggleTask(id) {
  const t = tasks.find(function (x) { return x.id === id; });
  t.done = !t.done;
  save();
  render();
}

function deleteTask(id) {
  tasks = tasks.filter(function (x) { return x.id !== id; });
  save();
  render();
}

function render() {
  const visible = tasks.filter(function (t) {
    if (currentFilter === 'active') return !t.done;
    if (currentFilter === 'done') return t.done;
    return true;
  });
  list.innerHTML = '';
  visible.forEach(function (t) {
    list.innerHTML += '<li class="' + (t.done ? 'done' : '') + '">' +
      '<input type="checkbox" ' + (t.done ? 'checked' : '') + ' onchange="toggleTask(' + t.id + ')">' +
      '<span>' + t.text + '</span>' +
      '<button class="del" onclick="deleteTask(' + t.id + ')">Hapus</button></li>';
  });
  const left = tasks.filter(function (t) { return !t.done; }).length;
  counter.textContent = left + ' tugas belum selesai';
}

document.getElementById('addBtn').addEventListener('click', addTask);
input.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') addTask();
});
document.querySelectorAll('.filter').forEach(function (btn) {
  btn.addEventListener('click', function () {
    currentFilter = btn.dataset.filter;
    document.querySelectorAll('.filter').forEach(function (b) { b.classList.remove('active'); });
    btn.classList.add('active');
    render();
  });
});

render();
