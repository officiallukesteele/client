export default async function({$auth, redirect, store}) {
    let user = $auth.user
    if(user) {
        // let the user in
    } else {
        redirect('/')
    }
}