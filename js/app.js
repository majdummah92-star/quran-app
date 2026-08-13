// ============================================================
// نظام إدارة 11 حلقة قرآنية - النسخة المتقدمة والتصدير الفاخر
// تصدير بطاقات الشكر والشهادات (PNG / PDF / HTML / نافذة مستقلة للطباعة)
// فرز وتخصيص الطلاب مع إدخال رقم الهوية وتاريخ ومكان الميلاد وإرسال إشعار فوري للمعلم
// إتاحة الصلاحية الكاملة للمشرف بتعديل بيانات ومستويات أي حلقة ومعلم وتعديل اسم الجمعية
// أزرار التنقل للأمام والخلف للصفحات والتواريخ والحلقات والطلاب
// ============================================================

function getOrganizationName() {
  return localStorage.getItem('quran_organization_name') || 'الجمعية الخيرية لتحفيظ القرآن الكريم';
}

function setOrganizationName(name) {
  if (name && name.trim()) {
    localStorage.setItem('quran_organization_name', name.trim());
  }
}

const HIJRI_YEARS = [
  { id: '1445', gregYear: '2024', label: '1445 هـ' },
  { id: '1446', gregYear: '2025', label: '1446 هـ' },
  { id: '1447', gregYear: '2026', label: '1447 هـ' },
  { id: '1448', gregYear: '2027', label: '1448 هـ' },
  { id: '1449', gregYear: '2028', label: '1449 هـ' },
  { id: '1450', gregYear: '2029', label: '1450 هـ' }
];

const GREG_YEARS = [
  { id: '2024', hijriYear: '1445', label: '2024 م' },
  { id: '2025', hijriYear: '1446', label: '2025 م' },
  { id: '2026', hijriYear: '1447', label: '2026 م' },
  { id: '2027', hijriYear: '1448', label: '2027 م' },
  { id: '2028', hijriYear: '1449', label: '2028 م' },
  { id: '2029', hijriYear: '1450', label: '2029 م' }
];

const HIJRI_MONTHS = [
  { id: '01', name: 'محرم', gregId: '07', label: '1 - محرم' },
  { id: '02', name: 'صفر', gregId: '08', label: '2 - صفر' },
  { id: '03', name: 'ربيع الأول', gregId: '09', label: '3 - ربيع الأول' },
  { id: '04', name: 'ربيع الثاني', gregId: '10', label: '4 - ربيع الثاني' },
  { id: '05', name: 'جمادى الأولى', gregId: '11', label: '5 - جمادى الأولى' },
  { id: '06', name: 'جمادى الآخرة', gregId: '12', label: '6 - جمادى الآخرة' },
  { id: '07', name: 'رجب', gregId: '01', label: '7 - رجب' },
  { id: '08', name: 'شعبان', gregId: '02', label: '8 - شعبان' },
  { id: '09', name: 'رمضان', gregId: '03', label: '9 - رمضان' },
  { id: '10', name: 'شوال', gregId: '04', label: '10 - شوال' },
  { id: '11', name: 'ذو القعدة', gregId: '05', label: '11 - ذو القعدة' },
  { id: '12', name: 'ذو الحجة', gregId: '06', label: '12 - ذو الحجة' }
];

const GREG_MONTHS = [
  { id: '01', name: 'يناير', hijriId: '07', label: '1 - يناير' },
  { id: '02', name: 'فبراير', hijriId: '08', label: '2 - فبراير' },
  { id: '03', name: 'مارس', hijriId: '09', label: '3 - مارس' },
  { id: '04', name: 'أبريل', hijriId: '10', label: '4 - أبريل' },
  { id: '05', name: 'مايو', hijriId: '11', label: '5 - مايو' },
  { id: '06', name: 'يونيو', hijriId: '12', label: '6 - يونيو' },
  { id: '07', name: 'يوليو', hijriId: '01', label: '7 - يوليو' },
  { id: '08', name: 'أغسطس', hijriId: '02', label: '8 - أغسطس' },
  { id: '09', name: 'سبتمبر', hijriId: '03', label: '9 - سبتمبر' },
  { id: '10', name: 'أكتوبر', hijriId: '04', label: '10 - أكتوبر' },
  { id: '11', name: 'نوفمبر', hijriId: '05', label: '11 - نوفمبر' },
  { id: '12', name: 'ديسمبر', hijriId: '06', label: '12 - ديسمبر' }
];

let activeHijriYear = '1447';
let activeGregYear = '2026';
let activeHijriMonth = '08';
let activeGregMonth = '02';
let activeDay = '15';

function getActiveDateLabel() {
  const hm = HIJRI_MONTHS.find(m => m.id === activeHijriMonth)?.name || 'شعبان';
  const gm = GREG_MONTHS.find(m => m.id === activeGregMonth)?.name || 'فبراير';
  return `يوم ${activeDay} | ${hm} ${activeHijriYear} هـ - ${gm} ${activeGregYear} م`;
}

function getTodayDate() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

const LEVELS = ['قراءة سليمة 📖', 'سفرة 📜', 'حفظ غيبي 🧠', 'إتقان وتجويد 🎖️'];

const CIRCLE_CONFIGS = [
  { id: 't1-id', name: 'الشيخ عبد الرحمن السعدي', username: 'teacher1', circle: 'حلقة الفجر', level: 'حفظ غيبي 🧠', basePages: 210 },
  { id: 't2-id', name: 'الشيخ محمد علي نور', username: 'teacher2', circle: 'حلقة النور', level: 'إتقان وتجويد 🎖️', basePages: 310 },
  { id: 't3-id', name: 'الشيخ إبراهيم الخليل', username: 'teacher3', circle: 'حلقة التبيان', level: 'سفرة 📜', basePages: 280 },
  { id: 't4-id', name: 'الشيخ يوسف الصديق', username: 'teacher4', circle: 'حلقة الفرقان', level: 'قراءة سليمة 📖', basePages: 190 },
  { id: 't5-id', name: 'الشيخ عثمان بن عفان', username: 'teacher5', circle: 'حلقة الإتقان', level: 'حفظ غيبي 🧠', basePages: 250 },
  { id: 't6-id', name: 'الشيخ حذيفة بن اليمان', username: 'teacher6', circle: 'حلقة التنزيل', level: 'سفرة 📜', basePages: 270 },
  { id: 't7-id', name: 'الشيخ مصعب بن عمير', username: 'teacher7', circle: 'حلقة الهدى', level: 'قراءة سليمة 📖', basePages: 220 },
  { id: 't8-id', name: 'الشيخ أُبي بن كعب', username: 'teacher8', circle: 'حلقة الترتيل', level: 'إتقان وتجويد 🎖️', basePages: 340 },
  { id: 't9-id', name: 'الشيخ سعد بن معاذ', username: 'teacher9', circle: 'حلقة الرضوان', level: 'حفظ غيبي 🧠', basePages: 230 },
  { id: 't10-id', name: 'الشيخ معاذ بن جبل', username: 'teacher10', circle: 'حلقة الإيمان', level: 'سفرة 📜', basePages: 290 },
  { id: 't11-id', name: 'الشيخ زيد بن ثابت', username: 'teacher11', circle: 'حلقة الصفوة', level: 'إتقان وتجويد 🎖️', basePages: 320 }
];

const FIRST_NAMES = ['أحمد', 'محمد', 'عمر', 'علي', 'يوسف', 'خالد', 'عبدالله', 'حمزة', 'سلمان', 'إبراهيم', 'طارق', 'سعد', 'أنس', 'صهيب', 'بلال', 'فيصل', 'بدر', 'إياد', 'مالك', 'زياد', 'حسن', 'حسين', 'مصطفى', 'ياسين', 'معاذ'];
const LAST_NAMES = ['العبدالله', 'الدوسري', 'القحطاني', 'الغامدي', 'العتيبي', 'الشمري', 'العنزي', 'المالكي', 'الحربي', 'المطيري', 'الشهري', 'العمري', 'الزهراني', 'الرويلي', 'القرني', 'السبيعي', 'الخالدي', 'الرشيدي', 'التميمي', 'البارقي'];

function generateFullDataSet() {
  const teachers = [
    { id: 'admin-id', name: 'المشرف العام', username: 'admin', password_hash: 'admin123', role: 'admin', circle_name: 'الإدارة العامة', level: 'إشراف عام', is_active: true, created_at: new Date().toISOString() }
  ];

  CIRCLE_CONFIGS.forEach(c => {
    teachers.push({
      id: c.id,
      name: c.name,
      username: c.username,
      password_hash: '123456',
      role: 'teacher',
      circle_name: c.circle,
      level: c.level,
      is_active: true,
      created_at: new Date().toISOString()
    });
  });

  const students = [];
  const monthly_reports = [];
  const student_monthly_records = [];
  const daily_logs = [];
  const todayStr = getTodayDate();

  CIRCLE_CONFIGS.forEach((c, cIdx) => {
    let circleTotalPages = 0;
    const repIdCur = `rep-cur-${cIdx + 1}`;

    for (let s = 1; s <= 25; s++) {
      const sId = `s-${cIdx + 1}-${s}`;
      const fname = FIRST_NAMES[(s + cIdx) % FIRST_NAMES.length];
      const lname = LAST_NAMES[(s * 3 + cIdx) % LAST_NAMES.length];
      const fullname = `${fname} ${lname}`;
      
      const isTrans = (s === 24);
      const isDrop = (s === 25);
      const status = isTrans ? 'transferred' : isDrop ? 'dropout' : 'active';

      const level = LEVELS[(s + cIdx) % LEVELS.length];
      const basePage = Math.floor(15 + (s * 20) + (cIdx * 7));
      const lastPage = Math.min(604, basePage);
      const behaviorScore = Math.min(10, 7 + (s % 4));

      const attDays = Math.min(22, 18 + (s % 5));
      const pagesDone = Math.floor(12 + (s * 2.8) + (cIdx * 2));
      const points = (lastPage * 5) + (attDays * 10) + (behaviorScore * 15);
      const natId = `109${(sIdx = s + cIdx * 25)}${String(10000 + s * 37).padStart(5, '0')}`;

      students.push({
        id: sId,
        teacher_id: c.id,
        name: fullname,
        national_id: natId,
        birth_date: `2014-0${(s % 8) + 1}-15`,
        birth_place: 'الرياض',
        level: level,
        status: status,
        last_page: lastPage,
        total_pages: lastPage,
        behavior_score: behaviorScore,
        points: points
      });

      if (status === 'active') {
        const prevPage = Math.max(0, lastPage - pagesDone);
        circleTotalPages += pagesDone;

        student_monthly_records.push({
          id: `rec-cur-${cIdx + 1}-${s}`,
          report_id: repIdCur,
          student_id: sId,
          prev_page: prevPage,
          new_page: lastPage,
          pages_completed: pagesDone,
          attendance_days: attDays,
          behavior_score: behaviorScore,
          notes: s % 3 === 0 ? 'متميز ومحافظ على جدول الحفظ والسلوك' : 'مواظبة جيدة ومراجع للمحفوظ',
          student_status: 'active'
        });

        daily_logs.push({
          id: `daily-${todayStr}-${sId}`,
          date: todayStr,
          teacher_id: c.id,
          student_id: sId,
          status: s % 9 === 0 ? 'absent' : 'present',
          page_reached: lastPage,
          memorized_today: Math.floor(1 + (s % 3)),
          behavior_score: behaviorScore,
          notes: 'تسميع ممتاز وحضور في الوقت المحدد'
        });
      }
    }

    monthly_reports.push({
      id: repIdCur,
      teacher_id: c.id,
      report_month: '1447-08',
      working_days: 22,
      total_pages_circle: circleTotalPages,
      submitted_at: new Date().toISOString()
    });
  });

  return { teachers, students, monthly_reports, student_monthly_records, daily_logs, teacher_notifications: [] };
}

function resetTo275Data() {
  const data = generateFullDataSet();
  for (const [tableKey, seedItems] of Object.entries(data)) {
    localStorage.setItem(`quran_db_${tableKey}`, JSON.stringify(seedItems));
  }
}

function initDataStore() {
  resetTo275Data();
}
initDataStore();

function getTable(table) {
  try {
    const raw = localStorage.getItem(`quran_db_${table}`);
    if (raw) {
      const data = JSON.parse(raw);
      if (Array.isArray(data) && data.length > 0) return data;
    }
  } catch {}
  const full = generateFullDataSet();
  const fallback = full[table] || [];
  localStorage.setItem(`quran_db_${table}`, JSON.stringify(fallback));
  return fallback;
}

function setTable(table, data) {
  localStorage.setItem(`quran_db_${table}`, JSON.stringify(data));
}

function authenticateUser(username, password) {
  const uClean = String(username || '').trim().toLowerCase();
  const pClean = String(password || '').trim();
  const teachers = getTable('teachers');

  return teachers.find(t => 
    String(t.username || '').trim().toLowerCase() === uClean &&
    (String(t.password_hash || '').trim() === pClean || String(t.password || '').trim() === pClean) &&
    t.is_active !== false
  ) || null;
}

const Session = {
  get() {
    try { return JSON.parse(localStorage.getItem('quran_session')); } catch { return null; }
  },
  set(user) {
    localStorage.setItem('quran_session', JSON.stringify(user));
  },
  clear() {
    localStorage.removeItem('quran_session');
  }
};

function showToast(msg, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
  toast.innerHTML = `<span>${icons[type] || ''}</span><span>${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 20);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3800);
}

function fmt(n) {
  return Number(n || 0).toLocaleString('ar-EG');
}

function initTheme() {
  const savedTheme = localStorage.getItem('quran_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('quran_theme', next);
  showToast(next === 'light' ? '☀️ الوضع الفاتح' : '🌙 الوضع الداكن', 'info');
}

function renderBarChart(containerId, labels, dataValues) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const maxVal = Math.max(...dataValues, 10);
  const barsHtml = labels.map((label, idx) => {
    const val = dataValues[idx] || 0;
    const heightPercent = Math.round((val / maxVal) * 100);
    return `
      <div style="display:flex;flex-direction:column;align-items:center;flex:1;gap:6px;height:100%;justify-content:flex-end;min-width:34px">
        <div style="font-size:0.75rem;font-weight:700;color:var(--gold)">${fmt(val)}</div>
        <div style="width:100%;max-width:28px;height:${Math.max(10, heightPercent)}%;background:linear-gradient(to top, var(--gold-dark), var(--gold));border-radius:6px 6px 0 0;transition:height 0.5s ease"></div>
        <div style="font-size:0.72rem;color:var(--text-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:65px;text-align:center" title="${label}">${label}</div>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div style="display:flex;align-items:flex-end;gap:8px;height:210px;padding-top:20px;border-bottom:2px solid var(--border);overflow-x:auto;padding-bottom:6px">
      ${barsHtml}
    </div>
  `;
}

function exportTableToExcelStyled(tableId, title = 'سجل الحلقات') {
  const table = document.getElementById(tableId);
  if (!table) { showToast('لم يتم العثور على الجدول للتصدير', 'error'); return; }

  const orgName = getOrganizationName();
  const dateLabel = getActiveDateLabel();

  let rowsHtml = '';
  const rows = table.querySelectorAll('tr');
  rows.forEach((row, rIdx) => {
    const isHeader = rIdx === 0;
    const cols = row.querySelectorAll('th, td');
    let cellsHtml = '';
    cols.forEach(col => {
      const text = col.innerText.replace(/\n/g, ' ').trim();
      if (isHeader) {
        cellsHtml += `<th style="background-color:#1a4d2e;color:#ffffff;font-weight:bold;font-size:12pt;border:1px solid #0b1f13;padding:10px;text-align:center;">${text}</th>`;
      } else {
        cellsHtml += `<td style="border:1px solid #cccccc;padding:8px;text-align:center;font-size:11pt;">${text}</td>`;
      }
    });
    rowsHtml += `<tr>${cellsHtml}</tr>`;
  });

  const excelTemplate = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: 'Segoe UI', Tahoma, sans-serif; direction: rtl; }
        .banner { background-color: #0b1f13; color: #d4a843; font-size: 16pt; font-weight: bold; text-align: center; padding: 15px; }
        .meta { background-color: #f0ede6; color: #1a4d2e; font-size: 11pt; font-weight: bold; text-align: right; padding: 8px; }
      </style>
    </head>
    <body>
      <table>
        <tr>
          <td colspan="6" class="banner">📖 ${orgName} - ${title}</td>
        </tr>
        <tr>
          <td colspan="6" class="meta">📅 الفترة: ${dateLabel} | 🗓️ تاريخ التصدير: ${getTodayDate()}</td>
        </tr>
        <tr></tr>
        ${rowsHtml}
      </table>
    </body>
    </html>
  `;

  const blob = new Blob([excelTemplate], { type: 'application/vnd.ms-excel;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${title}_${activeHijriYear}_${activeHijriMonth}.xls`;
  link.click();
  showToast('تم تصدير ملف Excel المصمم بنجاح 📊', 'success');
}

function drawRoundedRect(ctx, x, y, width, height, radius = 10) {
  if (typeof ctx.roundRect === 'function') {
    ctx.roundRect(x, y, width, height, radius);
  } else {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }
}

function showImagePreviewModal(dataUrl, fileName) {
  let modal = document.getElementById('image-preview-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'image-preview-modal';
    modal.className = 'modal-overlay';
    document.body.appendChild(modal);
  }
  modal.innerHTML = `
    <div class="modal" style="max-width:850px;background:#092c19;border:3px solid #d4a843;text-align:center;padding:20px">
      <div style="font-size:1.4rem;font-weight:900;color:#fef08a;margin-bottom:8px">🏆 تم تصنيع وتوليد صورة الشهادة بنجاح! 🏆</div>
      <div style="font-size:0.9rem;color:#d4a843;margin-bottom:14px">اختر خيار التصدير أو الحفظ المفضل لديك أدناه:</div>
      <div style="background:#000;padding:10px;border-radius:12px;margin-bottom:16px;border:1px solid #d4a843">
        <img src="${dataUrl}" style="max-width:100%;max-height:420px;border-radius:8px;box-shadow:0 4px 20px rgba(0,0,0,0.5)" alt="الشهادة">
      </div>
      <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap">
        <a href="${dataUrl}" download="${fileName}" class="btn btn-gold" style="font-size:1rem;padding:10px 20px;text-decoration:none">⬇️ تحميل PNG</a>
        <button class="btn btn-primary" style="font-size:1rem;padding:10px 20px" onclick="printCertificateDirectly()">🖨️ طباعة / حفظ PDF</button>
        <button class="btn btn-secondary" style="font-size:1rem;padding:10px 20px" onclick="const w=window.open('about:blank');w.document.write('<img src=\\'${dataUrl}\\' style=\\'width:100%\\'>');">🖼️ فتح في تبويب جديد</button>
        <button class="btn btn-secondary" style="font-size:1rem;padding:10px 18px" onclick="document.getElementById('image-preview-modal').classList.remove('open')">إغلاق ✕</button>
      </div>
    </div>
  `;
  modal.classList.add('open');
}

function downloadCanvasBlob(canvas, filename, targetName) {
  const cleanName = String(targetName || 'شهادة').replace(/\s+/g, '_');
  const fullFileName = `${filename}_${cleanName}.png`;
  const dataUrl = canvas.toDataURL('image/png');

  const anchor = document.getElementById('cert-direct-download-anchor');
  if (anchor) {
    anchor.href = dataUrl;
    anchor.download = fullFileName;
  }

  const imgPreview = document.getElementById('cert-rendered-preview-img');
  if (imgPreview) {
    imgPreview.src = dataUrl;
    imgPreview.style.display = 'inline-block';
  }

  try {
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = fullFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch (e) {}

  showToast('تم توليد الشهادة! يمكنك النقر على زر التحميل أو خيار الطباعة 🏆', 'success');
}

// MULTI-FORMAT GUARANTEED EXPORT FUNCTIONS
function printCertificateDirectly() {
  showToast('جاري تحضير الشهادة والفتح في نافذة الطباعة / حفظ PDF... 🖨️', 'info');
  window.print();
}

function openCertificatePopupWindow() {
  const printContent = document.getElementById('certificate-print-area')?.outerHTML || '';
  const orgName = getOrganizationName();
  const win = window.open('', '_blank', 'width=900,height=750');
  if (!win) {
    showToast('يرجى السماح بالنوافذ المنبثقة لفتح شهادة التكريم', 'warning');
    return;
  }

  win.document.write(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <title>شهادة تقدير - ${orgName}</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, sans-serif; background: #061a0f; color: #fff; padding: 20px; text-align: center; }
        .certificate-card { background: linear-gradient(135deg, #092c19 0%, #144d2d 50%, #0d3820 100%); color: #ffffff; border: 10px solid #d4a843; padding: 40px; border-radius: 20px; }
        .certificate-title { font-size: 2.5rem; color: #fef08a; font-weight: 900; margin-bottom: 8px; }
        .certificate-sub { font-size: 1.2rem; color: #d4a843; font-weight: 700; margin-bottom: 24px; }
        .certificate-student { font-size: 2.2rem; font-weight: 900; color: #fef08a; background: rgba(212,168,67,0.15); padding: 8px 24px; border-radius: 12px; display: inline-block; border: 1px solid #d4a843; margin: 12px 0; }
        .certificate-body { font-size: 1.2rem; line-height: 2; margin: 24px 0; }
        .certificate-footer { display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 2px dashed #d4a843; font-weight: bold; color: #fef08a; font-size: 1.2rem; }
        .no-print { margin-bottom: 20px; text-align: center; }
        .btn { background: #d4a843; color: #000; padding: 12px 28px; border: none; border-radius: 8px; font-size: 1.1rem; font-weight: bold; cursor: pointer; }
        @media print { .no-print { display: none !important; } body { padding: 0; background: none; } }
      </style>
    </head>
    <body>
      <div class="no-print">
        <button class="btn" onclick="window.print()">🖨️ طباعة الشهادة / حفظ كـ PDF</button>
      </div>
      ${printContent}
    </body>
    </html>
  `);
  win.document.close();
}

function exportCertificateAsHTMLFile(printAreaId = 'certificate-print-area', filename = 'بطاقة_تقدير') {
  const contentElement = document.getElementById(printAreaId);
  if (!contentElement) return;

  const content = contentElement.outerHTML;
  const orgName = getOrganizationName();
  const studentName = document.getElementById('cert-student-name')?.textContent || 'الطالب';

  const fullHtmlDoc = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>بطاقة شكر - ${studentName} - ${orgName}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700;900&display=swap');
    body {
      font-family: 'Tajawal', 'Segoe UI', sans-serif;
      background: #061a0f;
      color: #ffffff;
      margin: 0;
      padding: 40px 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
    }
    .certificate-card {
      background: linear-gradient(135deg, #092c19 0%, #144d2d 50%, #0d3820 100%) !important;
      color: #ffffff !important;
      border: 10px solid #d4a843 !important;
      padding: 40px;
      text-align: center;
      position: relative;
      max-width: 800px;
      width: 100%;
      border-radius: 20px;
      box-shadow: 0 12px 50px rgba(0,0,0,0.6);
      box-sizing: border-box;
    }
    .certificate-title {
      font-size: 2.3rem; font-weight: 900; color: #fef08a; margin-bottom: 6px;
    }
    .certificate-sub {
      font-size: 1.15rem; color: #d4a843; margin-bottom: 20px; font-weight: 700;
    }
    .certificate-body {
      font-size: 1.15rem; line-height: 1.9; margin: 20px 0; color: #f8fafc;
    }
    .certificate-student {
      font-size: 2.1rem; font-weight: 900; color: #fef08a; text-decoration: underline; margin: 8px 0;
      background: rgba(212,168,67,0.15); padding: 6px 18px; border-radius: 12px; display: inline-block;
      border: 1px solid rgba(212,168,67,0.4);
    }
    .certificate-footer {
      display: flex; justify-content: space-between; margin-top: 32px;
      padding-top: 16px; border-top: 2px dashed #d4a843; font-weight: 700; color: #fef08a; font-size: 1.1rem;
    }
    .top-actions {
      margin-bottom: 20px; display: flex; gap: 12px;
    }
    .btn-action {
      background: #d4a843; color: #092c19; font-weight: 900; padding: 12px 24px;
      border-radius: 8px; border: none; font-size: 1rem; cursor: pointer;
    }
    @media print {
      .top-actions { display: none !important; }
      body { padding: 0; background: none; }
    }
  </style>
</head>
<body>
  <div class="top-actions">
    <button class="btn-action" onclick="window.print()">🖨️ طباعة البطاقة / حفظ كـ PDF</button>
  </div>
  ${content}
</body>
</html>`;

  const cleanStudentName = studentName.replace(/\s+/g, '_');
  const fileNameFull = `${filename}_${cleanStudentName}.html`;
  const encodedHtml = 'data:text/html;charset=utf-8,' + encodeURIComponent(fullHtmlDoc);

  const htmlAnchor = document.getElementById('cert-html-download-anchor');
  if (htmlAnchor) {
    htmlAnchor.href = encodedHtml;
    htmlAnchor.download = fileNameFull;
  }

  try {
    const a = document.createElement('a');
    a.href = encodedHtml;
    a.download = fileNameFull;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch (e) {}

  const win = window.open('', '_blank');
  if (win) {
    win.document.write(fullHtmlDoc);
    win.document.close();
  }

  showToast(`تم تصدير وحفظ ملف بطاقة HTML (${fileNameFull}) بنجاح 📄`, 'success');
}

function copyCertificateHTMLCode() {
  const contentElement = document.getElementById('certificate-print-area');
  if (!contentElement) return;

  const content = contentElement.outerHTML;
  const orgName = getOrganizationName();
  const studentName = document.getElementById('cert-student-name')?.textContent || 'الطالب';

  const fullHtmlDoc = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>بطاقة شكر - ${studentName} - ${orgName}</title>
  <style>
    body { font-family: 'Tajawal', sans-serif; background: #061a0f; color: #fff; padding: 40px; text-align: center; }
    .certificate-card { background: linear-gradient(135deg, #092c19 0%, #144d2d 50%, #0d3820 100%); color: #ffffff; border: 10px solid #d4a843; padding: 40px; border-radius: 20px; }
    .certificate-title { font-size: 2.3rem; font-weight: 900; color: #fef08a; }
    .certificate-sub { font-size: 1.15rem; color: #d4a843; font-weight: 700; }
    .certificate-student { font-size: 2.1rem; font-weight: 900; color: #fef08a; background: rgba(212,168,67,0.15); padding: 6px 18px; border-radius: 12px; display: inline-block; border: 1px solid #d4a843; }
    .certificate-body { font-size: 1.15rem; line-height: 1.9; margin: 20px 0; }
    .certificate-footer { display: flex; justify-content: space-between; margin-top: 32px; padding-top: 16px; border-top: 2px dashed #d4a843; font-weight: 700; color: #fef08a; }
  </style>
</head>
<body>
  ${content}
</body>
</html>`;

  navigator.clipboard.writeText(fullHtmlDoc).then(() => {
    showToast('تم نسخ كود HTML للبطاقة إلى الحافظة بنجاح 📋', 'success');
  }).catch(() => {
    showToast('تعذر النسخ التلقائي للحافظة', 'warning');
  });
}

// CANVAS EXPORTER
function exportCertificateAsPNG(printAreaId, filename = 'شهادة_تقدير') {
  try {
    const orgName = getOrganizationName();
    const canvas = document.createElement('canvas');
    const width = 1600;
    const height = 1100;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // Background Gradient (Deep Emerald Green)
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, '#092c19');
    bgGrad.addColorStop(0.5, '#144d2d');
    bgGrad.addColorStop(1, '#092014');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Gold Double Borders & Frame
    ctx.strokeStyle = '#d4a843';
    ctx.lineWidth = 14;
    ctx.strokeRect(28, 28, width - 56, height - 56);

    ctx.strokeStyle = '#f5e6a3';
    ctx.lineWidth = 4;
    ctx.strokeRect(48, 48, width - 96, height - 96);

    // Ornate Corner Accents
    const drawCornerStar = (x, y) => {
      ctx.fillStyle = '#d4a843';
      ctx.font = '40px serif';
      ctx.textAlign = 'center';
      ctx.fillText('۞', x, y);
    };
    drawCornerStar(80, 95);
    drawCornerStar(width - 80, 95);
    drawCornerStar(80, height - 60);
    drawCornerStar(width - 80, height - 60);

    // Header Calligraphy Banner
    ctx.fillStyle = '#d4a843';
    ctx.font = 'bold 36px "Tajawal", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ', width / 2, 120);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 42px "Tajawal", sans-serif';
    ctx.fillText(`📖 ${orgName}`, width / 2, 190);

    // Certificate Main Title Badge
    ctx.fillStyle = '#d4a843';
    ctx.font = 'bold 56px "Tajawal", sans-serif';
    const titleText = document.getElementById('cert-main-title')?.textContent || '🏆 شهـادة شـكـر وتـقـديـر 🏆';
    ctx.fillText(titleText, width / 2, 275);

    ctx.fillStyle = '#e2e8f0';
    ctx.font = '26px "Tajawal", sans-serif';
    const subText = document.getElementById('cert-sub-title')?.textContent || `تتقدم ${orgName} بجزيل الشكر والامتنان والتقدير إلى:`;
    ctx.fillText(subText, width / 2, 335);

    // Target Person Name in Calligraphic Gold Box
    const targetName = document.getElementById('cert-student-name')?.textContent || 'الاسم الفاضل';

    ctx.fillStyle = 'rgba(212, 168, 67, 0.15)';
    ctx.strokeStyle = '#d4a843';
    ctx.lineWidth = 3;
    drawRoundedRect(ctx, width / 2 - 400, 370, 800, 100, 20);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#fef08a';
    ctx.font = 'bold 58px "Tajawal", sans-serif';
    ctx.fillText(`✨ ${targetName} ✨`, width / 2, 440);

    // Stats Badges Row
    const circleName = document.getElementById('cert-circle-name')?.textContent || 'حلقة التحفيظ';
    const levelText = document.getElementById('cert-level')?.textContent || 'حفظ غيبي 🧠';
    const pagesText = document.getElementById('cert-pages')?.textContent || '250';
    const pointsText = document.getElementById('cert-points')?.textContent || '1,450';
    const dateText = getActiveDateLabel();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 28px "Tajawal", sans-serif';
    ctx.fillText(`تقديراً لجهوده المباركة وعطائه المتميز في (${circleName})`, width / 2, 530);

    // 4 Boxes
    const drawStatBox = (x, y, w, h, icon, label, val, color) => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.6)';
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      drawRoundedRect(ctx, x, y, w, h, 14);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = color;
      ctx.font = 'bold 24px "Tajawal", sans-serif';
      ctx.fillText(`${icon} ${label}`, x + w / 2, y + 40);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 30px "Tajawal", sans-serif';
      ctx.fillText(val, x + w / 2, y + 85);
    };

    const boxW = 320, boxH = 110, gap = 30;
    const startX = (width - (4 * boxW + 3 * gap)) / 2;

    drawStatBox(startX, 570, boxW, boxH, '📖', 'الإنـجـاز', `${pagesText} صفحة`, '#34d399');
    drawStatBox(startX + boxW + gap, 570, boxW, boxH, '⭐', 'الـنـقـاط', `${pointsText} نقطة`, '#facc15');
    drawStatBox(startX + 2 * (boxW + gap), 570, boxW, boxH, '🎖️', 'الـمـسـتـوى', levelText, '#a78bfa');
    drawStatBox(startX + 3 * (boxW + gap), 570, boxW, boxH, '🌟', 'الـسـلـوك', 'ممتاز 10/10', '#f472b6');

    // Date Tag
    ctx.fillStyle = '#cbd5e1';
    ctx.font = 'bold 24px "Tajawal", sans-serif';
    ctx.fillText(`📅 الفترة الزمنية: ${dateText}`, width / 2, 750);

    // Footer Seal & Signature
    ctx.strokeStyle = '#d4a843';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(150, 830);
    ctx.lineTo(width - 150, 830);
    ctx.stroke();

    ctx.fillStyle = '#fef08a';
    ctx.font = 'bold 28px "Tajawal", sans-serif';
    ctx.fillText(`🕌 ختم ${orgName}`, 380, 890);

    const teacherName = document.getElementById('cert-teacher-name')?.textContent || 'معلم الحلقة';
    ctx.fillText(`✍️ توقيع: ${teacherName}`, width - 380, 890);

    downloadCanvasBlob(canvas, filename, targetName);
  } catch (err) {
    console.error('Export Error:', err);
    showToast('حدث خطأ أثناء تصدير الصورة: ' + err.message, 'error');
  }
}

function directDownloadStudentPNG(studentId) {
  openCertificateModal(studentId);
  exportCertificateAsPNG('certificate-print-area', 'بطاقة_تقدير_طالب');
}

function printSectionOrPDF(elementId, title = 'تقرير الحلقات') {
  try {
    showToast('جاري طباعة المستند... 📄', 'info');
    window.print();
  } catch (err) {
    showToast('حدث خطأ أثناء فتح نافذة الطباعة', 'error');
  }
}

function exportPrintableHTMLCertificate(type, id) {
  let title = 'شهادة شكر وتقدير';
  let studentName = '';
  let circleName = '';
  let level = '';
  let pages = 0;
  let points = 0;
  let teacherName = '';
  const orgName = getOrganizationName();
  const dateStr = getActiveDateLabel();

  if (type === 'student') {
    const students = getTable('students');
    const stu = students.find(s => s.id === id);
    if (!stu) return;
    const teachers = getTable('teachers');
    const tch = teachers.find(t => t.id === stu.teacher_id);

    studentName = stu.name;
    circleName = tch?.circle_name || 'حلقة التحفيظ';
    level = stu.level || tch?.level || 'حفظ غيبي 🧠';
    pages = stu.last_page || 0;
    points = stu.points || 0;
    teacherName = tch?.name || 'معلم الحلقة';
    title = '🏆 شهادة شكر وتقدير 🏆';
  } else if (type === 'teacher') {
    const teachers = getTable('teachers');
    const tch = teachers.find(t => t.id === id);
    if (!tch) return;
    const students = getTable('students').filter(s => s.teacher_id === id);
    const totalPages = students.reduce((a,b)=>a+(b.last_page||0),0);
    const totalPoints = students.reduce((a,b)=>a+(b.points||0),0);

    studentName = tch.name;
    circleName = tch.circle_name;
    level = tch.level || 'حفظ غيبي 🧠';
    pages = totalPages;
    points = totalPoints;
    teacherName = `إدارة ${orgName}`;
    title = '🏆 شهادة تكريم معلم متميز 🏆';
  }

  const cleanStudentName = studentName.replace(/\s+/g, '_');
  const fileNameFull = `بطاقة_${cleanStudentName}.html`;

  const fullHtml = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - ${studentName}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700;900&display=swap');
    * { box-sizing: border-box; }
    body {
      font-family: 'Tajawal', 'Segoe UI', sans-serif;
      background: #061a0f;
      color: #ffffff;
      margin: 0;
      padding: 30px 15px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
    }
    .cert-actions {
      margin-bottom: 24px;
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      justify-content: center;
    }
    .btn-action {
      background: #d4a843;
      color: #092c19;
      font-weight: 900;
      padding: 12px 28px;
      border-radius: 10px;
      border: 2px solid #fff;
      font-size: 1.1rem;
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(212,168,67,0.4);
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
    .certificate-card {
      background: linear-gradient(135deg, #092c19 0%, #144d2d 50%, #0d3820 100%);
      color: #ffffff;
      border: 10px solid #d4a843;
      padding: 45px 35px;
      text-align: center;
      position: relative;
      max-width: 850px;
      width: 100%;
      border-radius: 24px;
      box-shadow: 0 15px 60px rgba(0,0,0,0.7);
    }
    .certificate-crown { font-size: 3.5rem; margin-bottom: 8px; }
    .certificate-bismillah { font-size: 1.25rem; color: #d4a843; font-weight: 700; margin-bottom: 6px; }
    .certificate-title { font-size: 2.5rem; font-weight: 900; color: #fef08a; margin-bottom: 8px; text-shadow: 0 2px 10px rgba(0,0,0,0.4); }
    .certificate-sub { font-size: 1.2rem; color: #d4a843; margin-bottom: 24px; font-weight: 700; }
    .certificate-student {
      font-size: 2.4rem; font-weight: 900; color: #fef08a; text-decoration: none; margin: 12px 0;
      background: rgba(212,168,67,0.18); padding: 8px 28px; border-radius: 16px; display: inline-block;
      border: 2px solid rgba(212,168,67,0.5); box-shadow: 0 4px 15px rgba(0,0,0,0.3);
    }
    .certificate-body { font-size: 1.25rem; line-height: 2; margin: 24px 0; color: #f8fafc; }
    .certificate-badges { display: flex; justify-content: center; gap: 15px; flex-wrap: wrap; margin: 25px 0; }
    .badge-box { background: rgba(0,0,0,0.4); border: 2px solid #d4a843; padding: 10px 18px; border-radius: 12px; font-size: 1rem; color: #fef08a; font-weight: 700; }
    .certificate-footer { display: flex; justify-content: space-between; margin-top: 36px; padding-top: 20px; border-top: 2px dashed #d4a843; font-weight: 700; color: #fef08a; font-size: 1.2rem; }

    @media print {
      .cert-actions { display: none !important; }
      body { padding: 0; background: none; color: #000; }
      .certificate-card {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
        background: linear-gradient(135deg, #092c19 0%, #144d2d 50%, #0d3820 100%) !important;
        color: #ffffff !important; border: 10px solid #d4a843 !important;
        box-shadow: none !important;
      }
    }
  </style>
</head>
<body>
  <div class="cert-actions">
    <button class="btn-action" onclick="window.print()">🖨️ طباعة البطاقة / حفظ كـ PDF</button>
  </div>

  <div class="certificate-card">
    <div class="certificate-crown">👑</div>
    <div class="certificate-bismillah">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</div>
    <div class="certificate-title">${title}</div>
    <div class="certificate-sub">تتقدم ${orgName} بجزيل الشكر والتقدير والامتنان إلى</div>
    <div class="certificate-student">${studentName}</div>
    <div class="certificate-body">
      تقديراً لجهوده المباركة وحفظه المتميز برواية <strong>${circleName}</strong><br>
      في مستوى: <span style="color:#34d399;font-weight:700">${level}</span> | نسأل الله أن يجعله من أهل القرآن وخاصته.
    </div>
    <div class="certificate-badges">
      <div class="badge-box">📖 الصفحات: ${pages} صفحة</div>
      <div class="badge-box">⭐ النقاط: ${fmt(points)} نقطة</div>
      <div class="badge-box">📅 الفترة: ${dateStr}</div>
    </div>
    <div class="certificate-footer">
      <div>🕌 ختم ${orgName}</div>
      <div>✍️ توقيع: ${teacherName}</div>
    </div>
  </div>
</body>
</html>`;

  try {
    const dataUri = 'data:text/html;charset=utf-8,' + encodeURIComponent(fullHtml);
    const a = document.createElement('a');
    a.href = dataUri;
    a.download = fileNameFull;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch(e) {}

  const win = window.open('', '_blank');
  if (win) {
    win.document.write(fullHtml);
    win.document.close();
  }

  showToast(`تم التصدير المباشر لبطاقة HTML (${studentName}) 📄`, 'success');
}

function loadAdminAddStudentSection() {
  const teachers = getTable('teachers').filter(t => t.role === 'teacher');
  const sel = document.getElementById('admin-stu-circle');
  if (sel) {
    sel.innerHTML = teachers.map(t => `
      <option value="${t.id}">${t.circle_name} — (${t.name}) [${t.level || 'غيبي'}]</option>
    `).join('');
  }
  renderAdminStudentsMiniList();
}

function renderAdminStudentsMiniList() {
  const students = getTable('students').filter(s => s.status === 'active');
  const teachers = getTable('teachers');
  const container = document.getElementById('admin-all-students-mini');
  if (!container) return;

  container.innerHTML = students.map((s, idx) => {
    const tch = teachers.find(t => t.id === s.teacher_id);
    const birthInfo = s.birth_date ? ` | الميلاد: ${s.birth_date} (${s.birth_place || ''})` : '';
    const idInfo = s.national_id ? ` | الهوية: ${s.national_id}` : '';

    return `
      <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--border);font-size:0.88rem">
        <div>
          <strong>${idx + 1}. ${s.name}</strong>
          <span style="font-size:0.78rem;color:var(--text-muted);display:block">
            ${tch?.circle_name || 'حلقة'}${idInfo}${birthInfo} | المستوى: ${s.level || 'غيبي'}
          </span>
        </div>
        <div style="display:flex;gap:4px;align-items:center">
          <button class="btn btn-sm btn-gold" onclick="exportPrintableHTMLCertificate('student', '${s.id}')">📄 HTML / طباعة</button>
        </div>
      </div>
    `;
  }).join('');
}

initTheme();
