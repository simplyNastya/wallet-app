 export const getPasswordStrength = (password) => {
    if (password.length < 6) {
      return  'weak';
    } else if (password.length < 10) {
      return 'medium';
    }else if (password.length < 15) {
      return 'Fine';
    }  else {
      return 'strong';
    }
};
export const lengthPassword = (stateRegistr) => {
  if (stateRegistr.password !== stateRegistr.confirmPassword) {
    console.log(`not dublicat`)
  }else if(stateRegistr.password.length < 5) {
    console.log('< 5')
  } else {
    console.log('> 5')
  }
}

