function Button(props) {
  return <button className="btn" type={props.btnType} onClick={props.onClick}>{props.btnText}</button>;
}

export default Button;