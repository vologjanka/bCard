/**
 * Корневой компонент приложения: меню якорными ссылками и несколько секций на одной странице:
 * «Главная», «Увлечения», «Достижения», «Обратная связь» (Написать мне).
 * id у секций должны совпадать с href в меню (#home, #hobbies, #achievements, #contact).
 */
import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import './App.css'
import AboutMe from './components/AboutMe'
import AchievementsSection from './components/AchievementsSection'
import ContactSection from './components/ContactSection'
import FullName from './components/FullName'
import HobbiesSection from './components/HobbiesSection'
import ProfilePhoto from './components/ProfilePhoto'

function App() {
  /**
   * ref вешается на DOM-узел колонки с фото. Нужен, чтобы программно прочитать
   * высоту этой колонки и передать её левой колонке через CSS-переменную —
   * тогда сетка 30%/70% (FullName / AboutMe) совпадает по высоте с блоком фото.
   */
  const photoColumnRef = useRef<HTMLElement | null>(null)

  /**
   * Высота колонки с фото в пикселях. Обновляется через ResizeObserver,
   * когда меняется размер окна, подгрузка картинки и т.п.
   */
  const [photoHeight, setPhotoHeight] = useState<number>(0)

  useEffect(() => {
    const photoColumn = photoColumnRef.current
    // До первого рендера ref ещё null — выходим, эффект выполнится снова после монтирования.
    if (!photoColumn) return

    const updateHeight = () => {
      // getBoundingClientRect() даёт актуальные размеры относительно viewport.
      setPhotoHeight(photoColumn.getBoundingClientRect().height)
    }

    updateHeight()

    // ResizeObserver вызывает колбэк при изменении размеров наблюдаемого элемента.
    const observer = new ResizeObserver(updateHeight)
    observer.observe(photoColumn)

    // Очистка при размонтировании: отписываемся, чтобы не было утечек и лишних setState.
    return () => observer.disconnect()
  }, [])

  /**
   * React позволяет передавать кастомные CSS-свойства через style.
   * В App.css у .info-column задано height: var(--photo-height, auto).
   */
  const infoColumnStyle = {
    '--photo-height': photoHeight > 0 ? `${photoHeight}px` : 'auto',
  } as CSSProperties

  return (
    <main className="page">
      <header className="topBar">
        {/*
          Якорные ссылки: клик прокручивает страницу к элементу с тем же id.
          #hobbies — HobbiesSection, #achievements — AchievementsSection,
          #contact — ContactSection (форма обратной связи).
          [УЧЕБА: СВОЁ] тексты пунктов меню можно переименовать, но тогда нужно сохранить
          связку href="#" и id секции или обновить оба синхронно.
        */}
        <nav className="menu" aria-label="Главное меню">
          <a href="#home">Главная</a>
          <a href="#hobbies">Увлечения</a>
          <a href="#achievements">Достижения</a>
          <a href="#contact">Написать мне</a>
        </nav>
      </header>

      {/* Главный экран визитки: две колонки (текст слева, фото справа). */}
      <section id="home" className="heroSection">
        <section className="content-row">
          {/*
            Левая колонка: CSS Grid 3fr / 7fr задаётся в App.css;
            высота колонки синхронизируется с фото через --photo-height.
          */}
          <section className="info-column" style={infoColumnStyle}>
            <FullName />
            <AboutMe />
          </section>
          {/* ref нужен ResizeObserver’у для измерения высоты этой колонки. */}
          <section className="photo-column" ref={photoColumnRef}>
            <ProfilePhoto />
          </section>
        </section>
      </section>

      {/* Секция с id="hobbies" — цель ссылки «Увлечения» в меню. */}
      <HobbiesSection />

      {/* Секция с id="achievements" — цель ссылки «Достижения» в меню. */}
      <AchievementsSection />

      {/* Секция с id="contact" — цель ссылки «Написать мне» в меню. */}
      <ContactSection />
    </main>
  )
}

export default App
