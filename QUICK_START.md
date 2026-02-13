# 🚀 Quick Start Guide - Task Manager

Panduan cepat untuk menjalankan dan menggunakan aplikasi Task Manager.

---

## ⚡ Quick Setup

### 1. Start Backend

```bash
cd challenge-backend
npm install
npm run start:dev
```

Backend running di: `http://localhost:3000`

### 2. Start Frontend

```bash
cd challenge-frontend
npm install
npm run dev
```

Frontend running di: `http://localhost:3001`

### 3. Open Browser

Navigate ke: `http://localhost:3001`

---

## 🎯 Quick Test Flow (5 minutes)

### Step 1: Register Account (30 seconds)

1. Klik **"Sign up"**
2. Isi:
   - Name: `Test User`
   - Email: `test@example.com`
   - Password: `Test123!@#`
   - Birth: Pilih tanggal
3. Klik **"Create Account"**

✅ **Result**: Auto-login dan redirect ke dashboard

---

### Step 2: Create Tags (1 minute)

1. Klik **"Tags"** di sidebar
2. Klik **"New Tag"**
3. Buat tags:
   - `Work` ✅
   - `Personal` ✅
   - `Urgent` ✅

✅ **Result**: 3 tags created, visible di list

---

### Step 3: Create Tasks (2 minutes)

1. Klik **"Tasks"** di sidebar
2. Klik **"New Task"**
3. Buat tasks:

**Task 1:**

- Title: `Complete project`
- Description: `Finish the documentation`
- Tags: `Work`, `Urgent`

**Task 2:**

- Title: `Buy groceries`
- Description: `Milk, eggs, bread`
- Tags: `Personal`

**Task 3:**

- Title: `Team meeting`
- Description: `Discuss Q1 goals`
- Tags: `Work`

✅ **Result**: 3 tasks created

---

### Step 4: Test Features (1.5 minutes)

**A. Complete a Task:**

1. Klik checkbox di "Buy groceries"
2. ✅ Task ter-strikethrough

**B. Filter Tasks:**

1. Status dropdown → "Completed"
2. ✅ Shows 1 task
3. Tag dropdown → "Work"
4. ✅ Shows 2 tasks

**C. Search Tasks:**

1. Search: `meeting`
2. ✅ Shows "Team meeting"

**D. Edit Task:**

1. Hover task, klik ⋮ → Edit
2. Change title: `Team meeting at 2pm`
3. ✅ Updated

**E. Delete Task:**

1. Hover task, klik ⋮ → Delete
2. Confirm
3. ✅ Deleted

---

### Step 5: Check Dashboard (30 seconds)

1. Klik **"Dashboard"**
2. Verify stats:
   - Total Tasks: 2 ✅
   - Completed: 1 ✅
   - Tags: 3 ✅
   - Completion Rate: 50% ✅

---

### Step 6: Profile (1 minute)

1. Klik **"Profile"**
2. Update name: `Test User Updated`
3. ✅ Name updated everywhere

---

## ✅ Success Criteria

After quick test, you should see:

- [x] Registered and logged in
- [x] Created 3 tags
- [x] Created 3 tasks (1 completed, 2 active)
- [x] Filters working
- [x] Search working
- [x] Edit/Delete working
- [x] Dashboard stats accurate
- [x] Profile updated

---

## 🎨 Features to Explore

### Must Try:

- ✨ **Toast Notifications** - Create/update/delete shows toast
- 🔍 **Advanced Filters** - Combine search + status + tag
- 🏷️ **Multi-tag Tasks** - Add multiple tags to one task
- 📊 **Dashboard Stats** - Real-time updates
- 🎯 **Tag → Tasks Flow** - Click "View Tasks" from tags page
- 🔐 **Password Change** - Update your password
- ⚠️ **Delete Account** - Try the type-to-confirm flow

### UI/UX Features:

- 🌙 **Dark Mode** - Built-in professional dark theme
- 📱 **Responsive** - Try on mobile (DevTools)
- ⚡ **Animations** - Smooth transitions everywhere
- 🎨 **Loading States** - Skeleton loaders
- 🚫 **Empty States** - Beautiful placeholders

---

## 🐛 Common Issues

### Backend not starting?

```bash
# Check if port 3000 is in use
netstat -ano | findstr :3000
# Kill the process if needed
```

### Frontend not starting?

```bash
# Try different port
npm run dev -- --port 3002
```

### Can't login after register?

- Check backend logs
- Verify database connection
- Check network tab in browser

### Styles not loading?

```bash
# Clear cache and restart
rm -rf .next
npm run dev
```

---

## 📚 Full Documentation

For comprehensive testing:

- See `TESTING_SCENARIOS.md` (10 test scenarios, 50+ test cases)
- See `README.md` (Full project documentation)

---

## 🎉 Enjoy Testing!

The app is production-ready with:

- ✅ Full CRUD for tasks & tags
- ✅ Advanced filtering & search
- ✅ User authentication
- ✅ Profile management
- ✅ Professional UI/UX
- ✅ 100% TypeScript
- ✅ Responsive design
- ✅ Toast notifications
- ✅ Loading states
- ✅ Error handling

**Have fun! 🚀**
