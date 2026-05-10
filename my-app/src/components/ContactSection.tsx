/**
 * Секция «Обратная связь» (урок 5): форма с именем, email и сообщением.
 * Якорь id="contact" совпадает с href="#contact" в меню (App.tsx).
 *
 * ---------------------------------------------------------------------------
 * Почему в редакторе может быть «зачёркнутый» текст?
 *
 * • Не используется: переменная/импорт объявлены, но ни разу не читаются — IDE зачёркивает как мусор.
 * • Устарело (deprecated): редко, но тип или метод помечены в типах как «не используйте».
 * • JSX: комментарий // СРАЗУ после «return (» ПЕРЕД «<tag>» одной строкой может сбить
 *   подсветку — пояснения в разметке пишите блочным комментарием внутри фигурных скобок
 *   (как в примерах ниже; в файловом комментарии нельзя писать звёздочка+слэш — это конец блока).
 *
 * ---------------------------------------------------------------------------
 * ЧТО ДЕТИ ОСТАВЛЯЮТ ШАБЛОНОМ ([УЧЕБА: ШАБЛОН]), что меняют сами ([УЧЕБА: СВОЁ]):
 *
 * [УЧЕБА: ШАБЛОН] — не ломать на первом проходе:
 *   • id="contact", связь с aria-labelledby и id заголовка
 *   • useState для полей и ошибок, handleSubmit, preventDefault, логику проверок
 *   • связку value + onChange (контролируемые поля), aria-invalid, aria-describedby
 *   • type="submit", onSubmit на form (или по согласованию с преподавателем)
 *
 * [УЧЕБА: СВОЁ] — безопасно менять тексты и оформление:
 *   • заголовки, подписи label, тексты ошибок и успеха, подсказки placeholder
 *   • текст на кнопке, текст в блоке успеха (сохраняя смысл для пользователя)
 *   • классы из module.css уже подключены — цвета/отступы править в .module.css
 *
 * [УЧЕБА: ПРОДВИНУТЫЕ] — отправка на почту (Web3Forms, Formspree…), новые поля формы.
 * ---------------------------------------------------------------------------
 */

// [УЧЕБА: ШАБЛОН] Хук для хранения того, что вводит пользователь и сообщений об ошибках.
import { useState } from 'react'
// [УЧЕБА: ШАБЛОН] Отдельный импорт типа — часто так спокойнее ведёт себя подсветка IDE.
import type { FormEvent } from 'react'
// [УЧЕБА: ШАБЛОН] Стили только из этого файла; сами правки цветов — в ContactSection.module.css [СВОЁ].
import styles from './ContactSection.module.css'

/**
 * [УЧЕБА: ШАБЛОН]
 * Объект ошибок: пустая строка = ошибки по этому полю нет (так проще показать текст под полем).
 */
type FormErrors = {
  // [УЧЕБА: ШАБЛОН] Ключи совпадают с name полей и с обращением к errors.* в JSX.
  name: string
  email: string
  message: string
}

// [УЧЕБА: ШАБЛОН] Стартовое состояние — без ошибок; копируем в handleSubmit перед проверками.
const initialErrors: FormErrors = { name: '', email: '', message: '' }

/**
 * [УЧЕБА: ШАБЛОН] Простая проверка формата email.
 * trim() убирает пробелы по краям — «   » не считается за заполненное поле.
 * Регулярка — упрощённая; для курса достаточно. [УЧЕБА: ПРОДВИНУТЫЕ] можно заменить на библиотеку.
 */
function isValidEmail(value: string): boolean {
  // [УЧЕБА: ШАБЛОН] Упрощённая проверка «есть @ и точка». [УЧЕБА: ПРОДВИНУТЫЕ] — вынести в библиотеку или сервер.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

function ContactSection() {
  // [УЧЕБА: ШАБЛОН] Одна строка state = одно поле формы (контролируемый ввод).
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  // [УЧЕБА: ШАБЛОН] То же число ключей, что и полей; пустая строка = «ошибки нет» для этого поля.
  const [errors, setErrors] = useState<FormErrors>(initialErrors)

  /** [УЧЕБА: ШАБЛОН] Показывать зелёный блок после успешной проверки (без реальной отправки на сервер в этом примере). */
  const [isSuccess, setIsSuccess] = useState(false)

  /**
   * [УЧЕБА: ШАБЛОН]
   * Обработчик отправки: сначала проверки, потом очистка полей или выход при ошибках.
   */
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    // [УЧЕБА: ШАБЛОН] Иначе браузер перезагрузит страницу и React «обнулится».
    event.preventDefault()

    // [УЧЕБА: ШАБЛОН] Новый объект ошибок от «чистого» шаблона; дальше заполним только нужные ключи.
    const next: FormErrors = { ...initialErrors }
    // [УЧЕБА: ШАБЛОН] Флаг «была хоть одна ошибка» — тогда успех показывать нельзя.
    let hasError = false

    // [УЧЕБА: СВОЁ] Тексты в кавычках — ваши формулировки; [УЧЕБА: ШАБЛОН] условия if/else и hasError.
    if (!name.trim()) {
      next.name = 'Введите имя.' // [УЧЕБА: СВОЁ]
      hasError = true // [УЧЕБА: ШАБЛОН]
    }
    if (!email.trim()) {
      next.email = 'Введите email.' // [УЧЕБА: СВОЁ]
      hasError = true // [УЧЕБА: ШАБЛОН]
    } else if (!isValidEmail(email)) {
      next.email = 'Проверьте формат email (например name@mail.ru).' // [УЧЕБА: СВОЁ]
      hasError = true // [УЧЕБА: ШАБЛОН]
    }
    if (!message.trim()) {
      next.message = 'Напишите сообщение.' // [УЧЕБА: СВОЁ]
      hasError = true // [УЧЕБА: ШАБЛОН]
    }

    // [УЧЕБА: ШАБЛОН] Запись errors в state → перерисовка, под полями появятся <p role="alert">.
    setErrors(next)

    if (hasError) {
      setIsSuccess(false) // [УЧЕБА: ШАБЛОН] Спрятать зелёный блок, если снова словили ошибки.
      return // [УЧЕБА: ШАБЛОН] Не очищаем поля при ошибке — пользователь видит, что исправить.
    }

    // [УЧЕБА: ШАБЛОН] Цепочка «успех»: флаг + сброс полей + сброс ошибок (нет fetch — см. ПРОДВИНУТЫЕ в шапке).
    setIsSuccess(true)
    setName('') // [УЧЕБА: ШАБЛОН] Очистка контролируемых полей.
    setEmail('')
    setMessage('')
    setErrors(initialErrors) // [УЧЕБА: ШАБЛОН] Убрать старые сообщения после «отправки».
  }

  /*
   * Важно: не ставьте здесь однострочный // перед <section —
   * в некоторых редакторах подсветка JSX тогда выглядит «сломанной» или «зачёркнутой».
   */
  return (
    <section
      id="contact"
      className={styles.section}
      aria-labelledby="contact-page-title"
    >
      {/*
        Атрибуты <section> (сверху в разметке):
        [УЧЕБА: ШАБЛОН] id="contact" — якорь; при смене поправить href="#contact" в App.tsx.
        [УЧЕБА: СВОЁ] className={styles.section} — оформление в ContactSection.module.css.
        [УЧЕБА: ШАБЛОН] aria-labelledby — значение должно совпасть с id заголовка h2 (ниже).
      */}

      {/* [УЧЕБА: ШАБЛОН] id="contact-page-title" — не менять без aria-labelledby у section. [УЧЕБА: СВОЁ] className, текст внутри h2 */}
      <h2 id="contact-page-title" className={styles.pageTitle}>
        Написать мне
      </h2>
      {/* [УЧЕБА: СВОЁ] className={styles.lead} и весь абзац */}
      <p className={styles.lead}>
        Заполните форму — после валидации показываем успех без реальной отправки на сервер (урок в классе).
      </p>

      {/*
        [УЧЕБА: ШАБЛОН] Условный рендер через тернарник ? … : null (явный null).
        [УЧЕБА: ШАБЛОН] role="status" + aria-live="polite" — скринридер прочитает появление блока без навязчивости.
        [УЧЕБА: СВОЁ] className={styles.success} и текст между тегами div.
      */}
      {isSuccess ? (
        <div className={styles.success} role="status" aria-live="polite">
          Спасибо! Сообщение принято (учебная демонстрация).
        </div>
      ) : null}

      {/*
        [УЧЕБА: ШАБЛОН] onSubmit={handleSubmit} — связь формы с функцией (имя функции можно не трогать).
        [УЧЕБА: ШАБЛОН] noValidate — отключаем нативные подсказки браузера, показываем только errors из state.
        [УЧЕБА: СВОЁ] className={styles.formCard} — вид карточки в .module.css.
      */}
      <form className={styles.formCard} onSubmit={handleSubmit} noValidate>
        {/*
          Поле «Имя»:
          [УЧЕБА: ШАБЛОН] htmlFor на label === id на input; иначе клик по подписи не фокусирует поле.
          [УЧЕБА: СВОЁ] Текст в label, styles.label, обёртка styles.field.
        */}
        <div className={styles.field}>
          <label className={styles.label} htmlFor="contact-name">
            Имя
          </label>
          {/*
            [УЧЕБА: ШАБЛОН] id="contact-name" — пара к htmlFor и к aria-describedby (см. суффикс -error).
            [УЧЕБА: ШАБЛОН] value={name} + onChange + setName — контролируемый input.
            [УЧЕБА: ШАБЛОН] aria-invalid / aria-describedby — связь с блоком ошибки; id ошибки не перепутать.
            [УЧЕБА: ШАБЛОН] Условный className: ошибка → inputError, иначе input.
            [УЧЕБА: СВОЁ] placeholder, type="text" можно оставить; name="name" лучше согласовать с ключом errors.name.
            [УЧЕБА: ШАБЛОН] autoComplete="name" — подсказка браузеру; [УЧЕБА: ПРОДВИНУТЫЕ] другие значения по справочнику.
          */}
          <input
            id="contact-name"
            className={errors.name ? styles.inputError : styles.input}
            type="text"
            name="name"
            autoComplete="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              // [УЧЕБА: ШАБЛОН] Сброс ошибки при новом вводе; паттерн тот же у email и message.
              if (errors.name) setErrors((prev) => ({ ...prev, name: '' }))
            }}
            placeholder="Как к вам обращаться"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
          />
          {/*
            [УЧЕБА: ШАБЛОН] Показ только при errors.name; иначе null — нет лишнего DOM.
            [УЧЕБА: ШАБЛОН] id="contact-name-error" — должен совпасть с aria-describedby при ошибке.
            [УЧЕБА: ШАБЛОН] role="alert" — срочное объявление ошибки.
            [УЧЕБА: СВОЁ] Содержимое {errors.name} задаётся в handleSubmit; className={styles.errorText} — в .css.
          */}
          {errors.name ? (
            <p id="contact-name-error" className={styles.errorText} role="alert">
              {errors.name}
            </p>
          ) : null}
        </div>

        {/*
          Поле «Email» — та же схема, что у имени; [УЧЕБА: ШАБЛОН] type="email" и autoComplete="email".
        */}
        <div className={styles.field}>
          <label className={styles.label} htmlFor="contact-email">
            Email
          </label>
          <input
            id="contact-email"
            className={errors.email ? styles.inputError : styles.input}
            type="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              // [УЧЕБА: ШАБЛОН] Сброс ошибки email при вводе.
              if (errors.email) setErrors((prev) => ({ ...prev, email: '' }))
            }}
            placeholder="you@example.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
          />
          {errors.email ? (
            <p id="contact-email-error" className={styles.errorText} role="alert">
              {errors.email}
            </p>
          ) : null}
        </div>

        {/*
          Поле «Сообщение»:
          [УЧЕБА: ШАБЛОН] textarea + value/message/onChange/setMessage + те же aria-* и пара id.
          [УЧЕБА: СВОЁ] rows, placeholder; [УЧЕБА: ПРОДВИНУТЫЕ] maxLength, счётчик символов.
        */}
        <div className={styles.field}>
          <label className={styles.label} htmlFor="contact-message">
            Сообщение
          </label>
          <textarea
            id="contact-message"
            className={errors.message ? styles.textareaError : styles.textarea}
            name="message"
            rows={5}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value)
              // [УЧЕБА: ШАБЛОН] Сброс ошибки сообщения при вводе.
              if (errors.message) setErrors((prev) => ({ ...prev, message: '' }))
            }}
            placeholder="Текст сообщения"
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'contact-message-error' : undefined}
          />
          {errors.message ? (
            <p id="contact-message-error" className={styles.errorText} role="alert">
              {errors.message}
            </p>
          ) : null}
        </div>

        {/*
          [УЧЕБА: ШАБЛОН] type="submit" — отправка именно этой формы по Enter и по клику.
          [УЧЕБА: СВОЁ] Текст внутри кнопки и className={styles.submit} (.module.css).
        */}
        <button type="submit" className={styles.submit}>
          Отправить
        </button>
      </form>
    </section>
  )
}

// [УЧЕБА: ШАБЛОН] Имя компонента и default export связаны с import в App.tsx — менять только согласованно.
export default ContactSection
