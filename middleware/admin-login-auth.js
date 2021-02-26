export default async function({$auth, redirect, store}) {
    let user = $auth.user
    if(user && user.accountType === 'Admin') {
        
    } else {
        redirect('/admin-login')
    }
}