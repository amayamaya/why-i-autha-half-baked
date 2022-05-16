const SUPABASE_URL = 'https://yhletbviclmzgnzikzpu.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlobGV0YnZpY2xtemduemlrenB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTIyOTUzMjIsImV4cCI6MTk2Nzg3MTMyMn0.NSJ1Tw-LlfLsXJF4Y_nS3pwZV2TB7Ru8jvAsLxQLJWg';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
//will return all of your users "current user is Amaya"
export function getUser() {
    return client.auth.session() && client.auth.session().user;
}

// signs an new user in and puts an auth token in local storage in the browser
export async function signUpUser(email, password){
    const response = await client.auth.signUp({ email, password });
    
    return response.user;
}

export async function signInUser(email, password) {
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

// when a user tries to visit a page that calls this function, we automatically redirect the user back to the login page if they are not logged in
export function checkAuth() {
    const user = getUser();

    if (!user) location.replace('/'); 
}


// if not authorized send to home
export async function redirectIfLoggedIn() {}

// removes the token from local storage and redirects the user home
export async function logout() {
    await client.auth.signOut();

    return window.location.href = '/';
}
