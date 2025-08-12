export const signOutButton = (
    <li className="nav-item" key="signout">
      <form ref={(ref) => formRef = ref} className="button_to" method="post" action="/users/sign_out">
        <input type="hidden" name="_method" value="delete"/>
        <input type="hidden" name="authenticity_token" value={csrfToken} />
        <a href="#"
           className="nav-link"
           onClick={submitForm}>
           Log Out
        </a>
      </form>
    </li>
  );

export const isUserSignedIn = () => {
  // check browser cookie for user
  // TODO: replace with more secure state management
  if(document.cookie.includes("signed_in=true")) {
    return true;
  }
}

export const getCurrentUserId = () => {
  let userId = getCookie("current_user_id")
  if (userId !== null) {
    return parseInt(userId)
  } else {
    return -1;
  }
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}