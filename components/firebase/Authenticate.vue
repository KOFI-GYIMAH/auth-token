<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types';
import { type FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app';
import {
  type UserCredential,
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { type EmailPasswordType, EmailPasswordSchema } from '~/schema';

const toast = useToast();

const token = ref('');
const state = reactive({
  email: '',
  password: '',
  apiKey: '',
  authDomain: '',
});

const initializeFirebase = () => {
  if (state.apiKey.length <= 0) {
    toast.add({ description: 'API key is required', color: 'red' });
    return undefined;
  }
  localStorage.setItem('apiKey', state.apiKey);

  const firebaseConfig = {
    apiKey: state.apiKey,
    authDomain: state.authDomain,
  };

  const firebaseApp: FirebaseApp = !getApps().length
    ? initializeApp(firebaseConfig)
    : getApp();

  const auth: any = getAuth(firebaseApp);

  return auth;
};

async function handleSignIn(event: FormSubmitEvent<EmailPasswordType>) {
  const auth = initializeFirebase();
  const cred: UserCredential = await signInWithEmailAndPassword(
    auth,
    state.email,
    state.password
  );

  const t = await cred.user.getIdToken();
  token.value = t;
  toast.add({ description: 'Token generated' });
}

async function handleSignUp(event: FormSubmitEvent<EmailPasswordType>) {
  const auth = initializeFirebase();
  const cred = await createUserWithEmailAndPassword(
    auth,
    state.email,
    state.password
  );

  const t = await cred.user.getIdToken();
  token.value = t;
}

const continueWithGoogle = async () => {
  if (state.authDomain.length <= 0) {
    toast.add({ description: 'Auth domain is required', color: 'red' });
    return;
  }
  localStorage.setItem('authDomain', state.authDomain);

  if (state.apiKey.length <= 0) {
    toast.add({ description: 'API key is required', color: 'red' });
    return undefined;
  }

  const auth = initializeFirebase();
  const provider = new GoogleAuthProvider();

  await signInWithPopup(auth, provider)
    .then((result: UserCredential) => {
      const user = result.user;
      const accessToken = (user as any).accessToken;
      if (accessToken) {
        token.value = accessToken;
      }
    })
    .catch((error) => {
      toast.add({ description: error.message });
    });
};

const handleSignOut = async () => {
  const auth = await initializeFirebase();
  if (auth === undefined) {
    return;
  }

  signOut(auth)
    .then(() => {
      localStorage.clear();
      state.apiKey = '';
      state.authDomain = '';
      toast.add({ description: 'Sign-out successful' });
    })
    .catch((error) => {
      toast.add({ description: 'Sign-out failed' });
    });
};

onMounted(() => {
  const apiKey = localStorage.getItem('apiKey');
  if (apiKey) {
    state.apiKey = apiKey;
  }
  const authDomain = localStorage.getItem('authDomain');
  if (authDomain) {
    state.authDomain = authDomain;
  }
});
</script>

<template>
  <div>
    <h2 class="text-white max-w-md my-7 token">{{ token }}</h2>

    <UFormGroup
      label="Firebase API Key"
      name="apiKey"
      class="mb-5"
    >
      <UInput v-model="state.apiKey" />
    </UFormGroup>
    <UFormGroup
      label="Firebase Auth Domain (for social auth only)"
      name="authDomain"
      class="mb-5"
    >
      <UInput v-model="state.authDomain" />
    </UFormGroup>

    <SharedButton
      title="Continue With Google"
      class="mb-5"
      @click="continueWithGoogle"
    />

    <UForm
      :schema="EmailPasswordSchema"
      :state="state"
      class="space-y-4"
    >
      <UFormGroup
        label="Email"
        name="email"
      >
        <UInput v-model="state.email" />
      </UFormGroup>

      <UFormGroup
        label="Password"
        name="password"
      >
        <UInput
          v-model="state.password"
          type="password"
        />
      </UFormGroup>

      <div class="space-x-4">
        <UButton
          type="submit"
          :onclick="handleSignIn"
        >
          Sign in
        </UButton>

        <UButton
          type="submit"
          :onclick="handleSignUp"
        >
          Sign up
        </UButton>
      </div>
    </UForm>

    <SharedButton
      title="Sign out"
      class="mt-5"
      @click="handleSignOut"
    />
  </div>
</template>

<style scoped>
.token {
  max-height: 200px; /* Adjust the value as needed */
  overflow-y: auto;
}
</style>
