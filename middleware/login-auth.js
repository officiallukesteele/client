export default async function({$auth, redirect, store}) {
    let user = $auth.user
    if(user && user.accountType === 'Student') {
        // let the user in
    } else {
        redirect('/')
    }
}