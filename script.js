// ایران‌نامه | تعامل‌های صفحه
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

// هدر چسبان، منوی موبایل و نوار پیشرفت
const header = $('.site-header');
const progress = $('#scrollProgress');
const menuToggle = $('#menuToggle');
const mainNav = $('#mainNav');
window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
  header.classList.toggle('scrolled', window.scrollY > 30);
});
menuToggle.addEventListener('click', () => {
  const opened = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(opened));
});
$$('.main-nav a').forEach(link => link.addEventListener('click', () => {
  mainNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  $$('.main-nav a').forEach(item => item.classList.remove('active'));
  link.classList.add('active');
}));

// انیمیشن ورود بخش‌ها هنگام اسکرول
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
$$('.reveal').forEach(el => revealObserver.observe(el));

// فیلتر مقصدها
const filterButtons = $$('.filter-btn');
const destinationCards = $$('.destination-card');
const emptyState = $('#emptyState');
filterButtons.forEach(button => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  filterButtons.forEach(btn => {
    const active = btn === button;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-pressed', String(active));
  });
  let visibleCount = 0;
  destinationCards.forEach(card => {
    const visible = filter === 'all' || card.dataset.category === filter;
    card.hidden = !visible;
    if (visible) visibleCount++;
  });
  emptyState.hidden = visibleCount > 0;
}));

// خط زمان تعاملی
const eras = {
  elam: {
    number: '۰۱', label: 'تمدن‌های پیشاایرانی', title: 'ایلام؛ درخشش در جنوب‌غرب',
    text: 'تمدن ایلام در بخش‌هایی از جنوب‌غرب فلات ایران شکوفا شد. شوش از مراکز مهم آن بود و آثار باستانی این دوره، از سازمان اجتماعی و هنری پیشرفته‌ای خبر می‌دهند.'
  },
  achaemenid: {
    number: '۰۲', label: 'شاهنشاهی باستان', title: 'هخامنشیان؛ امپراتوری چندفرهنگی',
    text: 'کوروش بزرگ در شکل‌گیری شاهنشاهی هخامنشی نقش بنیادین داشت. در روزگار داریوش یکم، ساخت تخت جمشید آغاز شد؛ مجموعه‌ای که سنگ‌نگاره‌های آن یادآور تنوع مردمان قلمرو هخامنشی است.'
  },
  parthian: {
    number: '۰۳', label: 'شاهنشاهی اشکانی', title: 'اشکانیان؛ پیوند شرق و غرب',
    text: 'اشکانیان برای چند سده بر بخش بزرگی از ایران فرمان راندند. قرار گرفتن قلمرو آنان در مسیر راه‌های بازرگانی، ارتباط میان سرزمین‌های شرق و غرب را پررنگ کرد.'
  },
  sasanian: {
    number: '۰۴', label: 'شاهنشاهی ساسانی', title: 'ساسانیان؛ هنر و سازمان حکومتی',
    text: 'ساسانیان پس از اشکانیان به قدرت رسیدند. معماری، نقش‌برجسته‌ها، فلزکاری و نظام اداری این دوره در تاریخ ایران جایگاه مهمی دارند.'
  },
  islamic: {
    number: '۰۵', label: 'دوره‌های پس از ورود اسلام', title: 'شکوفایی دانش، زبان و هنر',
    text: 'در سده‌های پس از ورود اسلام، مراکز علمی و فرهنگی متعددی در ایران شکل گرفتند. زبان و ادبیات فارسی نو گسترش یافت و دانشمندان و شاعرانی اثرگذار پدیدار شدند.'
  },
  safavid: {
    number: '۰۶', label: 'دوره صفوی', title: 'صفویان؛ شکوه معماری و هنر',
    text: 'در دوره صفوی، اصفهان به یکی از کانون‌های مهم معماری و هنر تبدیل شد. میدان نقش جهان، مسجدها، پل‌ها و کارگاه‌های هنری از یادگارهای شناخته‌شده این دوره‌اند.'
  },
  modern: {
    number: '۰۷', label: 'دوره معاصر', title: 'ایران در جهان امروز',
    text: 'در سده‌های اخیر، شهرنشینی، آموزش، فناوری، ادبیات، سینما و هنرهای نو در کنار سنت‌های محلی، بخش‌های گوناگون جامعه و فرهنگ معاصر ایران را شکل داده‌اند.'
  }
};
$$('.era-point').forEach(button => button.addEventListener('click', () => {
  $$('.era-point').forEach(point => {
    const selected = point === button;
    point.classList.toggle('selected', selected);
    point.setAttribute('aria-pressed', String(selected));
  });
  const era = eras[button.dataset.era];
  $('#eraNumber').textContent = era.number;
  $('#eraLabel').textContent = era.label;
  $('#eraTitle').textContent = era.title;
  $('#eraText').textContent = era.text;
}));

// جست‌وجوی سریع در محتوای سایت
const searchInput = $('#siteSearch');
const searchResults = $('#searchResults');
const searchable = [
  { title: 'تخت جمشید', terms: 'تخت جمشید پرسپولیس فارس هخامنشی داریوش', href: '#heritage' },
  { title: 'پاسارگاد و آرامگاه کوروش', terms: 'پاسارگاد کوروش هخامنشی فارس', href: '#heritage' },
  { title: 'میدان نقش جهان اصفهان', terms: 'نقش جهان اصفهان صفوی معماری', href: '#heritage' },
  { title: 'بافت تاریخی یزد', terms: 'یزد بادگیر کویر معماری خشتی', href: '#heritage' },
  { title: 'جنگل‌های هیرکانی', terms: 'هیرکانی جنگل شمال گیلان مازندران گلستان', href: '#geography' },
  { title: 'بیابان لوت', terms: 'لوت کویر کلوت بیابان کرمان', href: '#geography' },
  { title: 'دوره هخامنشی', terms: 'هخامنشی کوروش داریوش خشایارشا تاریخ', href: '#timeline' },
  { title: 'نوروز و آیین‌های ایرانی', terms: 'نوروز هفت سین جشن بهار آیین', href: '#culture' },
  { title: 'ادبیات و شعر فارسی', terms: 'شعر فردوسی حافظ سعدی مولانا ادبیات', href: '#culture' },
  { title: 'غذاهای ایرانی', terms: 'قورمه سبزی فسنجان ته چین کباب غذا', href: '#culture' }
];
searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim().toLocaleLowerCase('fa');
  searchResults.innerHTML = '';
  if (query.length < 2) { searchResults.classList.remove('show'); return; }
  const matches = searchable.filter(item => (item.title + ' ' + item.terms).toLocaleLowerCase('fa').includes(query)).slice(0, 5);
  if (!matches.length) {
    searchResults.innerHTML = '<div class="search-result">نتیجه‌ای پیدا نشد؛ واژه دیگری را امتحان کن.</div>';
  } else {
    matches.forEach(item => {
      const link = document.createElement('a');
      link.className = 'search-result';
      link.href = item.href;
      link.textContent = item.title + '  ←';
      link.addEventListener('click', () => searchResults.classList.remove('show'));
      searchResults.appendChild(link);
    });
  }
  searchResults.classList.add('show');
});
document.addEventListener('click', event => {
  if (!event.target.closest('.hero-search-wrap')) searchResults.classList.remove('show');
});

// دانستنی تصادفی
const facts = [
  'نوروز، جشن آغاز بهار و سال نو در ایران و چندین کشور دیگر است.',
  'تخت جمشید در حدود سال ۵۱۸ پیش از میلاد به فرمان داریوش یکم بنیان گذاشته شد.',
  'پاسارگاد نخستین پایتخت دودمانی هخامنشیان بود.',
  'بادگیرها در معماری سنتی برخی شهرهای کویری برای کمک به تهویه طبیعی ساختمان به کار می‌رفتند.',
  'جنگل‌های هیرکانی از زیست‌بوم‌های ارزشمند و کهن پیرامون دریای خزر هستند.',
  'میدان نقش جهان اصفهان یکی از آثار ثبت‌شده در فهرست میراث جهانی یونسکو است.',
  'زبان فارسی در کنار زبان‌ها و گویش‌های محلی گوناگون در ایران رواج دارد.'
];
let lastFact = -1;
$('#newFact').addEventListener('click', () => {
  let next = Math.floor(Math.random() * facts.length);
  if (facts.length > 1 && next === lastFact) next = (next + 1) % facts.length;
  lastFact = next;
  $('#factBox').textContent = facts[next];
});

// آزمون سه پرسشی
const quizQuestions = [
  { question: 'ساخت مجموعه تخت جمشید به فرمان کدام پادشاه آغاز شد؟', options: ['کوروش بزرگ', 'داریوش یکم', 'خشایارشا'], answer: 1, note: 'داریوش یکم در حدود ۵۱۸ پیش از میلاد ساخت مجموعه تخت جمشید را آغاز کرد.' },
  { question: 'کدام شهر با میدان نقش جهان شناخته می‌شود؟', options: ['شیراز', 'تبریز', 'اصفهان'], answer: 2, note: 'میدان نقش جهان در مرکز تاریخی اصفهان قرار دارد.' },
  { question: 'جنگل‌های هیرکانی در کدام ناحیه ایران گسترده شده‌اند؟', options: ['حاشیه جنوبی دریای خزر', 'جنوب کویر لوت', 'سواحل خلیج فارس'], answer: 0, note: 'جنگل‌های هیرکانی در امتداد بخش‌هایی از کرانه جنوبی دریای خزر قرار دارند.' }
];
let questionIndex = 0;
let score = 0;
let answered = false;
let quizFinished = false;
function renderQuestion() {
  quizFinished = false;
  const question = quizQuestions[questionIndex];
  $('#questionCount').textContent = `پرسش ${questionIndex + 1} از ${quizQuestions.length}`;
  $('#quizProgress').style.width = `${((questionIndex + 1) / quizQuestions.length) * 100}%`;
  $('#questionText').textContent = question.question;
  $('#quizFeedback').textContent = '';
  $('#nextQuestion').disabled = true;
  $('#nextQuestion').textContent = questionIndex === quizQuestions.length - 1 ? 'دیدن نتیجه ←' : 'پرسش بعدی ←';
  $('#quizOptions').innerHTML = '';
  question.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.className = 'quiz-option';
    button.type = 'button';
    button.textContent = option;
    button.dataset.answer = index;
    button.addEventListener('click', () => chooseAnswer(index));
    $('#quizOptions').appendChild(button);
  });
  answered = false;
}
function chooseAnswer(selected) {
  if (answered) return;
  answered = true;
  const question = quizQuestions[questionIndex];
  const options = $$('.quiz-option', $('#quizOptions'));
  options.forEach((button, index) => {
    button.disabled = true;
    if (index === question.answer) button.classList.add('correct');
    if (index === selected && selected !== question.answer) button.classList.add('wrong');
  });
  if (selected === question.answer) {
    score++;
    $('#quizFeedback').textContent = 'آفرین! پاسخ درست است. ' + question.note;
  } else {
    $('#quizFeedback').textContent = 'این بار درست نبود. ' + question.note;
  }
  $('#quizScore').textContent = `امتیاز: ${score.toLocaleString('fa-IR')}`;
  $('#nextQuestion').disabled = false;
}
$('#nextQuestion').addEventListener('click', () => {
  if (quizFinished) {
    questionIndex = 0;
    score = 0;
    $('#quizScore').textContent = 'امتیاز: ۰';
    renderQuestion();
    return;
  }
  if (!answered) return;
  if (questionIndex < quizQuestions.length - 1) {
    questionIndex++;
    renderQuestion();
  } else {
    const resultText = score === 3 ? 'درخشان! هر سه پاسخ درست بود.' : score === 2 ? 'خیلی خوب! بیشتر پاسخ‌ها را درست دادی.' : score === 1 ? 'شروع خوبی بود؛ با گشت‌وگذار در سایت بیشتر یاد می‌گیری.' : 'این فقط یک شروع است؛ بخش‌های سایت را بخوان و دوباره امتحان کن.';
    $('#questionText').textContent = `نتیجه تو: ${score} از ۳`;
    $('#quizOptions').innerHTML = `<p class="quiz-result-text">${resultText}</p>`;
    $('#quizFeedback').textContent = 'برای شرکت دوباره، دکمه شروع مجدد را بزن.';
    $('#nextQuestion').disabled = false;
    $('#nextQuestion').textContent = 'شروع دوباره ↻';
    quizFinished = true;
  }
});
renderQuestion();
