# 🧪 Testing Scenarios - Task Manager Application

Comprehensive testing guide untuk menguji semua fitur aplikasi Task Manager dari awal hingga akhir.

---

## 📋 Prerequisites

Sebelum mulai testing, pastikan:

- ✅ Backend API sudah running di `http://localhost:3000`
- ✅ Frontend app sudah running di `http://localhost:3001` (atau port lain)
- ✅ Browser terbuka (Chrome, Firefox, atau Edge)
- ✅ Network/Internet connection stabil

---

## 🎯 Test Scenario 1: Registration & Authentication

### **Test Case 1.1: User Registration (Happy Path)**

**Steps:**

1. Buka browser, navigate ke `http://localhost:3001`
2. Klik tombol **"Sign up"** atau navigate ke `/register`
3. Isi form registrasi:
   - **Full Name**: `John Doe`
   - **Email**: `john.doe@test.com`
   - **Password**: `Test123!@#` (memenuhi requirement)
   - **Birth Date**: Pilih tanggal lahir (misal: `1990-01-15`)
4. Klik button **"Create Account"**

**Expected Result:**

- ✅ Password strength indicator berubah warna (weak → medium → strong)
- ✅ Form tervalidasi tanpa error
- ✅ Account berhasil dibuat
- ✅ Otomatis redirect ke dashboard `/`
- ✅ Melihat welcome message dengan nama user

---

### **Test Case 1.2: Password Validation**

**Steps:**

1. Di halaman register, test password requirement:
   - Coba password: `test` → Error: "minimum 8 characters"
   - Coba password: `testtest` → Error: "must contain uppercase"
   - Coba password: `Testtest` → Error: "must contain number"
   - Coba password: `Testtest1` → Error: "must contain special character"
   - Coba password: `Test123!@#` → ✅ Valid

**Expected Result:**

- ✅ Setiap error message muncul sesuai requirement
- ✅ Button "Create Account" disabled jika ada error
- ✅ Password strength indicator update real-time

---

### **Test Case 1.3: Login (Happy Path)**

**Steps:**

1. Logout (jika sudah login)
2. Navigate ke `/login`
3. Isi form login:
   - **Email**: `john.doe@test.com`
   - **Password**: `Test123!@#`
4. Klik button **"Sign In"**

**Expected Result:**

- ✅ Login berhasil
- ✅ Redirect ke dashboard
- ✅ Header menampilkan nama user
- ✅ Sidebar navigation muncul

---

### **Test Case 1.4: Login - Invalid Credentials**

**Steps:**

1. Navigate ke `/login`
2. Isi dengan credentials salah:
   - Email: `john.doe@test.com`
   - Password: `WrongPassword123!`
3. Klik "Sign In"

**Expected Result:**

- ✅ Error message muncul: "Invalid email or password"
- ✅ Tidak redirect
- ✅ Form tetap terisi (except password)

---

## 🎯 Test Scenario 2: Dashboard

### **Test Case 2.1: Dashboard Overview**

**Steps:**

1. Login dan navigate ke dashboard `/`
2. Perhatikan semua elemen di dashboard

**Expected Result:**

- ✅ Welcome message: "Welcome back, John Doe!"
- ✅ 4 stat cards muncul:
  - Total Tasks: 0
  - Completed Tasks: 0
  - Active Tags: 0
  - Completion Rate: 0%
- ✅ 3 Quick Action buttons:
  - New Task
  - New Tag
  - View All Tasks
- ✅ Recent Tasks section (empty state)
- ✅ Message: "No tasks yet. Get started by creating your first task!"

---

### **Test Case 2.2: Navigation**

**Steps:**

1. Test semua navigasi dari sidebar:
   - Klik **"Tasks"** → Navigate ke `/tasks`
   - Klik **"Tags"** → Navigate ke `/tags`
   - Klik **"Profile"** → Navigate ke `/profile`
   - Klik **"Dashboard"** → Kembali ke `/`

**Expected Result:**

- ✅ Setiap link navigate dengan benar
- ✅ Active indicator di sidebar berubah
- ✅ Page load tanpa error

---

## 🎯 Test Scenario 3: Tag Management

### **Test Case 3.1: Create Tags**

**Steps:**

1. Navigate ke `/tags`
2. Klik button **"New Tag"**
3. Dialog terbuka, isi:
   - **Tag Name**: `Work`
4. Klik **"Create Tag"**
5. Ulangi untuk tags berikut:
   - `Personal`
   - `Urgent`
   - `Learning`
   - `Health`

**Expected Result:**

- ✅ Dialog terbuka smooth dengan animation
- ✅ Setiap tag berhasil dibuat
- ✅ Dialog auto-close setelah create
- ✅ Tag list update real-time
- ✅ Stats update: "5 total tags"
- ✅ Badge muncul dengan tag name

---

### **Test Case 3.2: Search Tags**

**Steps:**

1. Di halaman tags, gunakan search bar
2. Ketik: `Work`
3. Ketik: `Urg`
4. Clear search dengan button "Clear"

**Expected Result:**

- ✅ Search filter real-time
- ✅ "Work" → Shows only "Work" tag
- ✅ "Urg" → Shows only "Urgent" tag
- ✅ Stats update: "1 matching tag"
- ✅ Clear button muncul saat ada search
- ✅ Clear button hilang semua filter

---

### **Test Case 3.3: Edit Tag**

**Steps:**

1. Hover over "Work" tag
2. Klik dropdown menu (⋮)
3. Klik **"Edit"**
4. Ubah name menjadi: `Work Projects`
5. Klik **"Save Changes"**

**Expected Result:**

- ✅ Dropdown menu muncul saat hover
- ✅ Dialog terbuka dengan data existing
- ✅ Tag berhasil di-update
- ✅ Nama tag berubah di list
- ✅ Dialog auto-close

---

### **Test Case 3.4: Delete Tag**

**Steps:**

1. Buat tag baru: `Test Tag`
2. Klik dropdown, pilih **"Delete"**
3. Konfirmasi dialog muncul
4. Klik **"Cancel"** → Dialog close
5. Ulangi delete, klik **"Delete Tag"**

**Expected Result:**

- ✅ Delete confirmation dialog muncul
- ✅ Warning message jelas
- ✅ Cancel membatalkan delete
- ✅ Delete Tag menghapus tag
- ✅ Tag hilang dari list
- ✅ Stats update

---

## 🎯 Test Scenario 4: Task Management

### **Test Case 4.1: Create Task - Basic**

**Steps:**

1. Navigate ke `/tasks`
2. Klik button **"New Task"**
3. Isi form:
   - **Title**: `Complete project documentation`
   - **Description**: `Write comprehensive docs for the project`
   - **Tags**: Select `Work Projects`
4. Klik **"Create Task"**

**Expected Result:**

- ✅ Dialog terbuka
- ✅ Tag selector menampilkan semua tags
- ✅ Task berhasil dibuat
- ✅ Task muncul di list
- ✅ Badge "Work Projects" muncul di task
- ✅ Stats update: "1 total"

---

### **Test Case 4.2: Create Multiple Tasks**

**Steps:**
Buat tasks berikut:

**Task 2:**

- Title: `Buy groceries`
- Description: `Milk, eggs, bread, vegetables`
- Tags: `Personal`

**Task 3:**

- Title: `Fix critical bug`
- Description: `Authentication issue on production`
- Tags: `Work Projects`, `Urgent`

**Task 4:**

- Title: `Morning workout`
- Description: `30 min cardio + stretching`
- Tags: `Health`, `Personal`

**Task 5:**

- Title: `Learn TypeScript`
- Description: `Complete advanced TypeScript course`
- Tags: `Learning`

**Expected Result:**

- ✅ Semua tasks berhasil dibuat
- ✅ Stats menunjukkan "5 total"
- ✅ Multi-tag support bekerja
- ✅ Tasks tersusun rapi

---

### **Test Case 4.3: Search Tasks**

**Steps:**

1. Di search bar, ketik: `bug`
2. Ketik: `Learn`
3. Ketik: `morning`
4. Clear dengan button "Clear Filters"

**Expected Result:**

- ✅ `bug` → Shows "Fix critical bug"
- ✅ `Learn` → Shows "Learn TypeScript"
- ✅ `morning` → Shows "Morning workout"
- ✅ Search case-insensitive
- ✅ Stats update dengan filtered count
- ✅ Clear button reset search

---

### **Test Case 4.4: Filter by Status**

**Steps:**

1. Ubah dropdown "Status" ke **"Active"**
2. Ubah ke **"Completed"**
3. Ubah kembali ke **"All Tasks"**

**Expected Result:**

- ✅ "Active" → Shows 5 tasks (semua uncompleted)
- ✅ "Completed" → Empty state (belum ada completed)
- ✅ "All Tasks" → Shows all 5 tasks
- ✅ Stats update sesuai filter

---

### **Test Case 4.5: Filter by Tag**

**Steps:**

1. Ubah dropdown "Tag" ke **"Work Projects"**
2. Ubah ke **"Personal"**
3. Ubah ke **"Urgent"**
4. Ubah ke **"All Tags"**

**Expected Result:**

- ✅ "Work Projects" → Shows 2 tasks
- ✅ "Personal" → Shows 2 tasks
- ✅ "Urgent" → Shows 1 task
- ✅ "All Tags" → Shows all 5 tasks
- ✅ Badge matching di task items

---

### **Test Case 4.6: Combined Filters**

**Steps:**

1. Status: **"Active"**
2. Tag: **"Personal"**
3. Search: `workout`
4. Klik **"Clear Filters"**

**Expected Result:**

- ✅ Combined filters work together
- ✅ Shows only "Morning workout"
- ✅ Stats: "1 active"
- ✅ Clear Filters reset semua
- ✅ Back to all 5 tasks

---

### **Test Case 4.7: Toggle Task Completion**

**Steps:**

1. Klik checkbox di task **"Buy groceries"**
2. Klik checkbox di task **"Morning workout"**
3. Filter Status → **"Completed"**
4. Uncheck task "Buy groceries"

**Expected Result:**

- ✅ Checkbox animation smooth
- ✅ Task title ter-strikethrough saat completed
- ✅ Task pindah styling (opacity change)
- ✅ Stats update: "2 completed, 3 active"
- ✅ Filter "Completed" shows 2 tasks
- ✅ Uncheck removes strikethrough
- ✅ Completion rate di dashboard update

---

### **Test Case 4.8: Edit Task**

**Steps:**

1. Hover task **"Learn TypeScript"**
2. Klik dropdown menu (⋮)
3. Klik **"Edit"**
4. Ubah:
   - Title: `Master TypeScript & React`
   - Description: `Complete advanced course and build 3 projects`
   - Tags: Add `Work Projects` (total: Learning + Work Projects)
5. Klik **"Save Changes"**

**Expected Result:**

- ✅ Edit dialog terbuka dengan data existing
- ✅ Title dan description ter-prefill
- ✅ Existing tags ter-select
- ✅ Multi-tag selection works
- ✅ Task berhasil di-update
- ✅ Perubahan visible di list
- ✅ Dialog auto-close

---

### **Test Case 4.9: Delete Task**

**Steps:**

1. Hover task **"Fix critical bug"**
2. Klik dropdown → **"Delete"**
3. Konfirmasi dialog muncul
4. Klik **"Cancel"** → Dialog close
5. Ulangi, klik **"Delete Task"**

**Expected Result:**

- ✅ Delete confirmation muncul
- ✅ Task details ditampilkan
- ✅ Cancel membatalkan
- ✅ Delete menghapus task
- ✅ Task hilang dari list
- ✅ Stats update: "4 total"

---

### **Test Case 4.10: View Tasks by Tag (from Tags page)**

**Steps:**

1. Navigate ke `/tags`
2. Hover tag **"Personal"**
3. Klik button **"View Tasks"**

**Expected Result:**

- ✅ Navigate ke `/tasks?tag={id}`
- ✅ Tag filter auto-selected
- ✅ Shows only tasks with "Personal" tag
- ✅ URL contains tag parameter

---

## 🎯 Test Scenario 5: Profile Management

### **Test Case 5.1: View Profile**

**Steps:**

1. Navigate ke `/profile`
2. Perhatikan semua sections

**Expected Result:**

- ✅ Account Overview card menampilkan:
  - Full Name: John Doe
  - Email: john.doe@test.com (with "Verified" badge)
  - Birth Date: January 15, 1990
  - Account Created: [date]
- ✅ Edit Profile Form (with current data)
- ✅ Change Password Form
- ✅ Danger Zone (Delete Account)

---

### **Test Case 5.2: Edit Profile**

**Steps:**

1. Di Edit Profile Form, ubah:
   - **Name**: `John Alexander Doe`
   - **Birth Date**: `1990-06-20`
2. Klik **"Save Changes"**

**Expected Result:**

- ✅ Form tervalidasi
- ✅ Success message: "Profile updated successfully!"
- ✅ Account Overview update real-time
- ✅ Dashboard header update dengan nama baru
- ✅ Sidebar update

---

### **Test Case 5.3: Change Password - Validation**

**Steps:**

1. Di Change Password Form:
   - Old Password: `Test123!@#`
   - New Password: `weak`
2. Lihat error messages

**Expected Result:**

- ✅ Error: "Password must be at least 8 characters"
- ✅ Button disabled saat ada error
- ✅ Real-time validation

---

### **Test Case 5.4: Change Password - Success**

**Steps:**

1. Isi Change Password Form:
   - **Old Password**: `Test123!@#`
   - **New Password**: `NewPass123!@#`
   - **Confirm Password**: `NewPass123!@#`
2. Klik **"Change Password"**
3. Logout dan login dengan password baru

**Expected Result:**

- ✅ Form validated
- ✅ Success message: "Password changed successfully!"
- ✅ Form auto-reset (cleared)
- ✅ Dapat login dengan password baru
- ✅ Tidak bisa login dengan password lama

---

### **Test Case 5.5: Change Password - Mismatch**

**Steps:**

1. Isi:
   - Old Password: `NewPass123!@#`
   - New Password: `Another123!@#`
   - Confirm Password: `Different123!@#`
2. Klik "Change Password"

**Expected Result:**

- ✅ Error: "Passwords do not match"
- ✅ Error di field confirmPassword
- ✅ Button disabled

---

### **Test Case 5.6: Delete Account - Cancel**

**Steps:**

1. Scroll ke Danger Zone
2. Klik button **"Delete Account"**
3. Dialog terbuka
4. Lihat warning message
5. Klik **"Cancel"**

**Expected Result:**

- ✅ Confirmation dialog muncul
- ✅ Warning banner dengan alert icon
- ✅ Email user ditampilkan
- ✅ Input box untuk type "DELETE"
- ✅ Delete button disabled (belum type)
- ✅ Cancel menutup dialog tanpa delete

---

### **Test Case 5.7: Delete Account - Execute**

⚠️ **WARNING**: Test ini akan menghapus account! Pastikan ini test account.

**Steps:**

1. Klik **"Delete Account"**
2. Type `DELETE` di input box (case-sensitive)
3. Klik **"Delete Account"**

**Expected Result:**

- ✅ Button enable setelah type "DELETE"
- ✅ Account berhasil dihapus
- ✅ Otomatis logout
- ✅ Redirect ke `/login`
- ✅ Tidak bisa login lagi dengan credentials ini

---

## 🎯 Test Scenario 6: Integration & Flow

### **Test Case 6.1: Complete User Journey**

**Steps:**

1. **Register** new account: `jane.doe@test.com`
2. **Create 3 tags**: Work, Personal, Urgent
3. **Create 5 tasks** dengan berbagai kombinasi tags
4. **Complete 2 tasks**
5. **Edit 1 task** - ubah title dan tags
6. **Delete 1 task**
7. **Filter tasks** by tag "Work"
8. **Search** task by keyword
9. **Edit profile** - ubah name
10. **Dashboard** - check stats updated

**Expected Result:**

- ✅ Semua operasi berhasil
- ✅ Stats konsisten di semua halaman
- ✅ Dashboard menampilkan recent tasks
- ✅ Completion rate calculated correctly
- ✅ Navigation smooth tanpa lag

---

### **Test Case 6.2: Dashboard Stats Accuracy**

**Steps:**

1. Note stats di dashboard
2. Create 2 new tasks
3. Kembali ke dashboard
4. Complete 1 task
5. Kembali ke dashboard

**Expected Result:**

- ✅ Total Tasks: +2
- ✅ Completed: +1
- ✅ Completion Rate: Calculated correctly
- ✅ Recent Tasks shows 5 latest
- ✅ Stats real-time update

---

## 🎯 Test Scenario 7: UI/UX & Polish

### **Test Case 7.1: Responsive Design - Mobile**

**Steps:**

1. Buka Chrome DevTools (F12)
2. Toggle Device Toolbar (Ctrl+Shift+M)
3. Set ke iPhone 12 Pro (390x844)
4. Test semua pages

**Expected Result:**

- ✅ Sidebar collapse ke hamburger menu
- ✅ Forms stack vertically
- ✅ Buttons full-width on mobile
- ✅ Filters stack vertically
- ✅ Stats cards stack (1 column)
- ✅ All content readable
- ✅ No horizontal scroll

---

### **Test Case 7.2: Responsive Design - Tablet**

**Steps:**

1. Set DevTools ke iPad (768x1024)
2. Test all pages

**Expected Result:**

- ✅ 2-column stats layout
- ✅ Sidebar visible
- ✅ Filters mix of horizontal/vertical
- ✅ All content accessible

---

### **Test Case 7.3: Loading States**

**Steps:**

1. Open Network tab di DevTools
2. Set throttling ke "Slow 3G"
3. Navigate ke `/tasks`
4. Refresh page

**Expected Result:**

- ✅ Loading spinner muncul
- ✅ Skeleton loaders untuk tasks (optional)
- ✅ Graceful loading, no flash of unstyled content
- ✅ Content loads progressively

---

### **Test Case 7.4: Empty States**

**Steps:**

1. Register account baru
2. Check `/tasks` → Empty state
3. Check `/tags` → Empty state
4. Check dashboard → Empty recent tasks

**Expected Result:**

- ✅ Meaningful empty state messages
- ✅ Icons/illustrations present
- ✅ Call-to-action buttons
- ✅ Helpful text

---

### **Test Case 7.5: Animations & Transitions**

**Steps:**

1. Observe animations saat:
   - Dialog open/close
   - Task checkbox toggle
   - Hover effects
   - Page transitions
   - Filter changes

**Expected Result:**

- ✅ Smooth 0.2-0.3s transitions
- ✅ No janky animations
- ✅ Consistent timing
- ✅ Professional feel

---

## 🎯 Test Scenario 8: Error Handling

### **Test Case 8.1: Network Error**

**Steps:**

1. Stop backend server
2. Try to create a task
3. Start backend server
4. Retry

**Expected Result:**

- ✅ Error message muncul
- ✅ Message jelas: "Failed to create task"
- ✅ No app crash
- ✅ Retry berhasil setelah server up

---

### **Test Case 8.2: Form Validation Errors**

**Steps:**
Test semua forms dengan invalid data:

- Empty required fields
- Invalid email format
- Weak passwords
- Missing selections

**Expected Result:**

- ✅ Clear error messages
- ✅ Error positioned near field
- ✅ Red color for errors
- ✅ Submit button disabled

---

### **Test Case 8.3: Duplicate Handling**

**Steps:**

1. Create tag: `Work`
2. Try create another tag: `Work`

**Expected Result:**

- ✅ Backend returns error
- ✅ Error message displayed
- ✅ Form stays open
- ✅ User can correct

---

## 🎯 Test Scenario 9: Performance

### **Test Case 9.1: Large Dataset**

**Steps:**

1. Create 50 tasks
2. Create 20 tags
3. Navigate between pages
4. Apply filters
5. Search tasks

**Expected Result:**

- ✅ No lag in UI
- ✅ Search instant (<100ms)
- ✅ Filters instant
- ✅ Smooth scrolling
- ✅ Page loads <1s

---

### **Test Case 9.2: Concurrent Operations**

**Steps:**

1. Open 2 browser tabs
2. Login same account both tabs
3. Tab 1: Create task
4. Tab 2: Refresh → See new task
5. Tab 2: Delete task
6. Tab 1: Refresh → Task gone

**Expected Result:**

- ✅ Changes visible after refresh
- ✅ No data corruption
- ✅ Consistent state

---

## 🎯 Test Scenario 10: Security

### **Test Case 10.1: Protected Routes**

**Steps:**

1. Logout
2. Manually navigate ke `/tasks`
3. Check redirect

**Expected Result:**

- ✅ Redirect to `/login`
- ✅ Cannot access protected routes
- ✅ After login, can access

---

### **Test Case 10.2: Auth Pages Redirect**

**Steps:**

1. Login
2. Manually navigate ke `/login`

**Expected Result:**

- ✅ Redirect to `/` (dashboard)
- ✅ Cannot access login when authenticated

---

## ✅ Test Completion Checklist

After completing all tests, verify:

- [ ] All CRUD operations work (Tasks & Tags)
- [ ] All filters work correctly
- [ ] Search functionality accurate
- [ ] User authentication secure
- [ ] Profile management functional
- [ ] Dashboard stats accurate
- [ ] Responsive on all devices
- [ ] Error handling graceful
- [ ] Loading states smooth
- [ ] Animations professional
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] All forms validated
- [ ] All empty states proper

---

## 📊 Expected Results Summary

**Functional:**

- ✅ 100% features working
- ✅ All CRUD operations
- ✅ All filters accurate
- ✅ Authentication secure

**UI/UX:**

- ✅ Professional design
- ✅ Smooth animations
- ✅ Responsive layout
- ✅ Clear error messages

**Performance:**

- ✅ Fast page loads
- ✅ Instant filters
- ✅ No lag or freeze

**Code Quality:**

- ✅ Type-safe
- ✅ No errors in console
- ✅ Clean code

---

## 🐛 Bug Report Template

If you find bugs during testing:

```markdown
**Bug Title**: [Short description]

**Severity**: Critical / High / Medium / Low

**Steps to Reproduce**:

1. Navigate to...
2. Click on...
3. Enter...

**Expected Result**:
What should happen

**Actual Result**:
What actually happened

**Screenshots**:
[Attach if possible]

**Environment**:

- Browser: Chrome 120
- OS: Windows 11
- Frontend: localhost:3001
- Backend: localhost:3000
```

---

## 📝 Notes

- Test dengan berbagai browsers (Chrome, Firefox, Edge)
- Test di berbagai screen sizes
- Test dengan koneksi lambat
- Test dengan dataset besar
- Check browser console untuk errors
- Check network tab untuk failed requests

**Happy Testing! 🎉**
