import classes from './Loader.module.css'

export default function Loader() {
  return (
    <>
      <div className={classes.loader}>
        <div className={classes.face}>
          <div className={classes.circle}></div>
        </div>
        <div className={classes.face}>
          <div className={classes.circle}></div>
        </div>
      </div>
    </>
  )
}
