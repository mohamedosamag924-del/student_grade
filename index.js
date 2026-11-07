class Student {
  constructor(id, name, grades, attendance) {
    this.id = id;
    this.name = name;
    this.grades = grades;
    this.attendance = attendance;
  }

  // حساب المتوسط باستخدام reduce
  calculateAverage() {
    const total = this.grades.reduce((sum, grade) => sum + grade, 0);
    return total / this.grades.length;
  }

  // التقدير بالحروف
  getGrade(average) {
    if (average >= 90) return "A";
    else if (average >= 80) return "B";
    else if (average >= 70) return "C";
    else if (average >= 60) return "D";
    else if (average >= 50) return "E";
    else return "F";
  }

  // النتيجة النهائية
  getFinalResult() {
    const average = this.calculateAverage();
    return average >= 50 && this.attendance >= 75 ? "ناجح" : "يحتاج مراجعة";
  }
}

// المصفوفة الرئيسية
const studentsList = [
  new Student(1001, "أحمد محمود", [90, 85, 95], 92),
  new Student(1002, "سارة علي", [78, 70, 82], 80),
  new Student(1003, "عمر خالد", [45, 42, 48], 85),
  new Student(1004, "منى حسن", [40, 44, 47], 70),
];

// ===== لجنة الرأفة =====

// 1) الاستخراج: الطلاب المتعثرون (متوسط بين 40 و 49)
const strugglingStudents = studentsList.filter((student) => {
  const avg = student.calculateAverage();
  return avg >= 40 && avg <= 49;
});

// 2) المعالجة: إضافة 5 درجات رأفة
const curvedStudents = strugglingStudents.map((student) => ({
  id: student.id,
  name: student.name,
  originalAverage: student.calculateAverage(),
  newAverage: student.calculateAverage() + 5,
}));

// 3) التحليل: جمع المتوسطات الجديدة
const totalNewAverages = curvedStudents.reduce(
  (sum, student) => sum + student.newAverage,
  0
);

// 4) متوسط الرأفة مع درع الحماية من القسمة على صفر
const curveAverage =
  curvedStudents.length > 0 ? totalNewAverages / curvedStudents.length : 0;

// ===== المخرجات =====

console.log("========== تقرير الطلاب ==========");
studentsList.forEach((student) => {
  const avg = student.calculateAverage();
  console.log(
    `الاسم: ${student.name} | المتوسط: ${avg.toFixed(2)} | التقدير: ${student.getGrade(avg)} | النتيجة: ${student.getFinalResult()}`
  );
});

console.log("\n========== الطلاب المتعثرون بعد الرأفة ==========");
console.log(curvedStudents);

console.log("\n========== متوسط الطلاب المتعثرين بعد التعديل ==========");
console.log(curveAverage.toFixed(2));