export const handleClick = (msg, setmsg, setnum1, setnum2) => {
    setmsg(msg);
    setnum1('');
    setnum2('');
};

export const handleNum = (num, setnum) => {
    const value = num.target.value;
    if (/^[-]?\d*\.?\d*$/.test(value)) {
      setnum(value);
    }
};
