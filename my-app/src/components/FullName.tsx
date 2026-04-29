import styles from './FullName.module.css'

function FullName() {
  return (
    <section className={styles.fullName} aria-label="ФИО">
      <h1 className={styles.title}>Дуванова Ирина Александровна</h1>
    </section>
  )
}

export default FullName
