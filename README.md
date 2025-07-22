## Next.js GetX-Style State Management

A lightweight, reactive state management solution for Next.js inspired by Flutter's GetX, providing a simple yet powerful way to manage application state, dependencies, and side effects.

---

### Features ✨

* Reactive State Management with observable values
* Dependency Injection system
* Built-in Services:

  * Internationalization (i18n)
  * Theme management
  * Snackbar notifications
  * Route management
* Controller Lifecycle (`onInit()` / `onClose()`)
* Scoped Dependencies for component isolation
* Performance Optimized updates

---

### Installation 📦

```bash
npm install next-getx
# or
yarn add next-getx
```

---

### Core Concepts 🧠

#### Reactive State

```tsx
const counter = new Rx<number>(0); // Create observable
counter.value = 1; // Update value
const current = counter.value; // Read value

// In components:
const value = useRx(counter); // Subscribe to changes
```

#### Dependency Injection

```tsx
// Register a service
put(new AuthService(), { permanent: true });

// Retrieve a service
const authService = find(AuthService);

// Scoped dependency
const scopedService = find(UserService, 'user-profile');
```

---

### Usage Examples 🛠️

#### 1. Basic Counter

```tsx
// counter.controller.ts
export class CounterController extends GetxController {
  count = new Rx<number>(0);

  increment() {
    this.count.value += 1;
  }
}

// Counter.tsx
function Counter() {
  const controller = find(CounterController);
  const count = useRx(controller.count);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => controller.increment()}>
        Increment
      </button>
    </div>
  );
}
```

#### 2. Internationalization (i18n)

```tsx
// Initialize translations
translation.addTranslations({
  en: {
    buttons: {
      submit: "Submit",
      cancel: "Cancel"
    }
  },
  es: {
    buttons: {
      submit: "Enviar",
      cancel: "Cancelar"
    }
  }
});

// In components
function Form() {
  const t = useTranslate();
  
  return (
    <button>{t('buttons.submit')}</button>
  );
}
```

#### 3. Theme Management

```tsx
// Toggle theme
themeService.toggleTheme();

// Add custom theme
themeService.addTheme('dark', {
  colors: {
    primary: '#000',
    background: '#fff'
  }
});
```

---

### Advanced Features 🚀

#### Scoped Controllers

```tsx
function UserProfile() {
  const userController = find(UserController, 'user-profile');
  // Controller auto-disposed when component unmounts
}
```

#### Snackbar Notifications

```tsx
snackbar.show('Operation successful!', 'success');
```

#### Persistent Storage

```tsx
storage.write('user-token', 'abc123');
const token = storage.read<string>('user-token');
```

---

### API Reference 📚

| Feature          | Import Path              | Description                  |
| ---------------- | ------------------------ | ---------------------------- |
| `Rx`             | `@/lib/getx/state`       | Reactive state container     |
| `GetxController` | `@/lib/getx/controller`  | Base controller class        |
| `put` / `find`   | `@/lib/getx/dependency`  | Dependency injection         |
| `translation`    | `@/lib/getx/translation` | Internationalization service |
| `themeService`   | `@/lib/getx/theme`       | Theme management             |
| `snackbar`       | `@/lib/getx/snackbar`    | Notification service         |
| `storage`        | `@/lib/getx/storage`     | Persistent storage           |

---

### Comparison with Other Solutions ⚖️

| Feature        | Next-GetX      | Zustand | Redux     | Context API |
| -------------- | -------------- | ------- | --------- | ----------- |
| Bundle Size    | ✅ Small        | ✅ Small | ❌ Medium  | ✅ Small     |
| Learning Curve | ✅ Easy         | ✅ Easy  | ❌ Steep   | ✅ Easy      |
| Reactivity     | ✅ Fine-grained | ✅ Good  | ❌ Verbose | ❌ Coarse    |
| DI System      | ✅ Built-in     | ❌ No    | ❌ No      | ❌ No        |
| Scoped State   | ✅ Yes          | ❌ No    | ❌ No      | ❌ No        |

---

### Contributing 🤝

Contributions are welcome! Please see our [contribution guidelines](https://github.com/riad804/getx-npm).

---

### License 📄

MIT
