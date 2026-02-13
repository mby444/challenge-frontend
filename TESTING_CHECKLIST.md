# ✅ Testing Checklist - Task Manager

Quick checklist untuk memastikan semua fitur berfungsi dengan baik.

---

## 🔐 Authentication & Authorization

### Registration

- [ ] Password validation rules enforced (8 chars, uppercase, lowercase, number, special)
- [ ] Password strength indicator updates real-time
- [ ] Birth date required and validated
- [ ] Successful registration redirects to dashboard
- [ ] Duplicate email shows error

### Login

- [ ] Valid credentials → successful login
- [x] Invalid credentials → error message (BUG: Halaman login ter-refresh sehingga pesan error hilang)
- [ ] Auto-redirect to dashboard after login
- [ ] Session persists across page refresh

### Protected Routes

- [x] Unauthenticated users redirected to `/login` (BUG: Unauthenticated dapat melihat tampilan pada halaman / sebelum di-redirect ke /login)
- [ ] Authenticated users cannot access `/login` or `/register`
- [ ] All dashboard routes protected

---

## 🏠 Dashboard

### Stats Cards

- [ ] Total Tasks count accurate
- [ ] Completed Tasks count accurate
- [ ] Active Tags count accurate
- [ ] Completion Rate calculated correctly (completed/total \* 100)

### Recent Tasks

- [ ] Shows up to 5 most recent tasks
- [ ] Empty state when no tasks
- [ ] Tasks sorted by creation date (newest first)

### Quick Actions

- [ ] "New Task" button opens task dialog
- [ ] "New Tag" button navigates to tags page
- [ ] "View All Tasks" navigates to tasks page

### Real-time Updates

- [ ] Stats update when task created
- [ ] Stats update when task completed
- [ ] Stats update when task deleted
- [ ] Recent tasks update on task create

---

## 🏷️ Tags Management

### Create Tag

- [ ] Dialog opens smoothly
- [ ] Name validation (required, max 50 chars)
- [ ] Tag created successfully
- [ ] Tag appears in list immediately
- [ ] Dialog closes after create
- [ ] Stats update

### Read/View Tags

- [ ] All tags displayed with badges
- [ ] Task count per tag accurate
- [ ] Empty state when no tags
- [ ] "View Tasks" button navigates with tag filter

### Update Tag

- [ ] Edit dialog pre-fills current name
- [ ] Name updated successfully
- [ ] Changes reflected immediately
- [ ] Dialog closes after update

### Delete Tag

- [ ] Confirmation dialog appears
- [ ] Warning shown if tag has tasks
- [ ] Cancel aborts deletion
- [ ] Delete removes tag
- [ ] Tag removed from all tasks
- [ ] Stats update

### Search Tags

- [ ] Real-time filtering
- [ ] Case-insensitive search
- [ ] Stats update with filtered count
- [ ] Clear button appears when searching
- [ ] Clear button resets search

---

## ✅ Tasks Management

### Create Task

- [ ] Dialog opens smoothly
- [ ] Title validation (required, max 200 chars)
- [ ] Description optional
- [ ] Tag selector shows all tags
- [ ] Multiple tags can be selected
- [ ] Task created successfully
- [ ] Task appears in list
- [ ] Dialog closes after create
- [ ] Stats update

### Read/View Tasks

- [ ] All tasks displayed
- [ ] Task title and description shown
- [ ] Tags display as badges
- [ ] Completion status visible
- [ ] Created date shown
- [ ] Empty state when no tasks

### Update Task

- [ ] Edit dialog pre-fills all fields
- [ ] Title and description editable
- [x] Tags can be added/removed (BUG: Tag tidak berubah setelah diedit)
- [ ] Changes saved successfully
- [ ] UI updates immediately
- [ ] Dialog closes after update

### Delete Task

- [ ] Confirmation dialog appears
- [ ] Task details shown in confirmation
- [ ] Cancel aborts deletion
- [ ] Delete removes task
- [ ] Task removed from list
- [ ] Stats update

### Toggle Completion

- [ ] Checkbox clickable
- [ ] Task title strikethrough when completed
- [ ] Visual feedback (opacity change)
- [ ] Stats update immediately
- [ ] Persists after page refresh

### Search Tasks

- [ ] Searches title AND description
- [ ] Real-time filtering
- [ ] Case-insensitive
- [ ] Stats update with filtered count
- [ ] Empty state when no matches

### Filter by Status

- [ ] "All Tasks" shows all
- [ ] "Active" shows only uncompleted
- [ ] "Completed" shows only completed
- [ ] Stats update per filter
- [ ] Label indicates filter type

### Filter by Tag

- [ ] "All Tags" shows all
- [ ] Selecting tag filters correctly
- [ ] Shows tasks with that tag
- [ ] Works with multi-tagged tasks
- [ ] Stats update per filter

### Combined Filters

- [ ] Search + Status filter works
- [ ] Search + Tag filter works
- [ ] Status + Tag filter works
- [ ] Search + Status + Tag all work together
- [ ] Clear Filters button appears when any filter active
- [ ] Clear Filters resets all (search + status + tag)

### Tag Navigation

- [ ] Clicking "View Tasks" from tags page navigates to tasks
- [ ] URL contains tag parameter (`?tag={id}`)
- [ ] Tag filter auto-selected on tasks page
- [ ] Correct tasks shown

---

## 👤 Profile Management

### View Profile

- [ ] Account Overview shows all info:
  - [ ] Full name
  - [ ] Email with "Verified" badge
  - [ ] Birth date (formatted nicely)
  - [ ] Account created date
- [ ] Edit Profile form pre-filled
- [ ] Change Password form empty
- [ ] Danger Zone section visible

### Edit Profile

- [ ] Name validation (min 2, max 100)
- [ ] Email validation
- [ ] Birth date validation
- [ ] Update successful
- [ ] Success message shown
- [ ] Account Overview updates
- [ ] Header/sidebar updates with new name

### Change Password

- [ ] Old password required
- [ ] New password validation (same as register)
- [ ] Confirm password required
- [ ] Passwords must match
- [ ] Success message shown
- [ ] Form clears after success
- [ ] Can login with new password
- [ ] Cannot login with old password

### Delete Account

- [ ] Confirmation dialog appears
- [ ] Warning banner shown
- [ ] User email displayed
- [ ] Must type "DELETE" to enable button
- [ ] Case-sensitive check
- [ ] Cancel aborts deletion
- [ ] Delete removes account
- [ ] Auto logout
- [ ] Redirect to login
- [ ] Cannot login with deleted account

---

## 🎨 UI/UX

### Responsive Design

- [ ] Mobile (< 640px): All content accessible
- [ ] Tablet (640-1024px): Optimized layout
- [ ] Desktop (> 1024px): Full features visible
- [ ] Sidebar collapses on mobile
- [ ] Forms stack vertically on mobile
- [ ] Filters stack on mobile
- [ ] Stats cards responsive grid

### Loading States

- [ ] Spinner shown during API calls
- [ ] Loading doesn't block UI
- [ ] Skeleton loaders (if implemented)
- [ ] No flash of unstyled content

### Empty States

- [ ] Tasks: Helpful message + create button
- [ ] Tags: Helpful message + create button
- [ ] Recent tasks: Encouraging message
- [ ] Search results: Helpful guidance
- [ ] Different messages for empty vs no-match

### Animations

- [ ] Dialog open/close smooth
- [ ] Task checkbox toggle animated
- [ ] Hover effects on interactive elements
- [ ] Page transitions smooth
- [ ] Toast slide-in animation
- [ ] All animations 200-300ms

### Toast Notifications

- [ ] Task created → Success toast
- [ ] Task updated → Success toast
- [ ] Task deleted → Warning toast
- [ ] Tag created → Success toast
- [ ] Profile updated → Success toast
- [ ] Password changed → Success toast
- [ ] Error operations → Error toast
- [ ] Auto-dismiss after 5s
- [ ] Close button works
- [ ] Multiple toasts stack properly

### Accessibility

- [ ] All forms have labels
- [ ] Error messages clear
- [ ] Focus indicators visible
- [ ] Keyboard navigation works
- [ ] ARIA labels present
- [ ] Color contrast sufficient

---

## 🔧 Error Handling

### Network Errors

- [ ] Backend down → Error message
- [ ] Slow network → Loading state
- [ ] Timeout → Error message
- [ ] No app crash on error

### Form Validation

- [ ] Required fields validated
- [ ] Email format validated
- [ ] Password strength enforced
- [ ] Error messages clear and helpful
- [ ] Errors positioned near fields
- [ ] Submit disabled when errors

### API Errors

- [ ] Duplicate email → Error shown
- [ ] Duplicate tag → Error shown
- [ ] Invalid credentials → Error shown
- [ ] Unauthorized → Redirect to login
- [ ] Server errors → Generic error message

---

## ⚡ Performance

### Page Load

- [ ] Initial load < 2s
- [ ] Subsequent loads < 1s
- [ ] No unnecessary re-renders
- [ ] Images optimized (if any)

### Interactions

- [ ] Search instant (< 100ms)
- [ ] Filter instant (< 100ms)
- [ ] Toggle completion instant
- [ ] No lag with 50+ tasks
- [ ] No lag with 20+ tags

### Optimization

- [ ] React hooks optimized (useMemo, useCallback)
- [ ] No console warnings
- [ ] No memory leaks
- [ ] Efficient re-renders

---

## 🔒 Security

### Authentication

- [ ] JWT token stored securely
- [ ] Token included in API requests
- [ ] Token refreshed appropriately
- [ ] Logout clears token

### Route Protection

- [ ] Protected routes enforce auth
- [ ] Middleware checks token
- [ ] Unauthorized redirects work

### Data Validation

- [ ] Client-side validation
- [ ] Server-side validation (backend)
- [ ] XSS prevention
- [ ] SQL injection prevention (backend)

---

## 🧪 Browser Compatibility

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Edge (latest)
- [ ] Safari (latest)

---

## 📱 Device Testing

- [ ] Mobile phone (< 640px)
- [ ] Tablet (640-1024px)
- [ ] Laptop (1024-1440px)
- [ ] Desktop (> 1440px)

---

## 🎯 Edge Cases

### Data

- [ ] 0 tasks → Empty state
- [ ] 1 task → Singular labels
- [ ] 100+ tasks → Performance OK
- [ ] Task with no tags
- [ ] Task with 5+ tags
- [ ] Tag with 0 tasks
- [ ] Tag with 50+ tasks

### User Actions

- [ ] Rapid clicking → No double submit
- [ ] Cancel dialog → No changes saved
- [ ] Browser back button → Navigation works
- [ ] Refresh page → State persists (if logged in)
- [ ] Multiple tabs → Consistent data (after refresh)

### Inputs

- [ ] Very long task title (200 chars)
- [ ] Very long description (1000+ chars)
- [ ] Special characters in names
- [ ] Emoji in task titles 😀
- [ ] Leading/trailing spaces trimmed

---

## ✅ Final Checklist

Before declaring "DONE":

- [ ] All features working
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] No broken links
- [ ] All forms validated
- [ ] All CRUD operations work
- [ ] Responsive on all devices
- [ ] Animations smooth
- [ ] Loading states proper
- [ ] Error handling graceful
- [ ] Security measures in place
- [ ] Performance acceptable
- [ ] Documentation complete

---

## 📊 Score Card

**Total Checkboxes**: ~200+

**Passing Criteria**:

- ✅ **100%** = Production Ready! 🚀
- ✅ **95-99%** = Nearly there, minor issues
- ⚠️ **90-94%** = Good, some improvements needed
- ⚠️ **< 90%** = More work required

---

## 🐛 Found a Bug?

Document it:

1. **What**: Brief description
2. **Where**: Which page/component
3. **Steps**: How to reproduce
4. **Expected**: What should happen
5. **Actual**: What actually happened
6. **Impact**: Critical / High / Medium / Low

---

**Happy Testing! 🎉**
