<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Алан-Кровля - Профессиональный монтаж кровли в Саратове</title>
    <script src="https://cdn.tailwindcss.com/3.4.16"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.6.0/remixicon.min.css"
      rel="stylesheet"
    />
    <script>
      tailwind.config = {
        theme: {
          extend: {
            colors: { primary: "#FDCD22", secondary: "#2563EB" },
            borderRadius: {
              none: "0px",
              sm: "4px",
              DEFAULT: "8px",
              md: "12px",
              lg: "16px",
              xl: "20px",
              "2xl": "24px",
              "3xl": "32px",
              full: "9999px",
              button: "8px",
            },
          },
        },
      };
    </script>
  </head>
  <body class="bg-gray-50 text-gray-800">
    <div
      id="serviceDetailsModal"
      class="fixed inset-0 bg-black/50 z-50 hidden flex items-center justify-center"
    >
      <div
        class="bg-blue-100 rounded-lg p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto text-gray-800 border border-blue-300"
      >
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-2xl font-bold" id="serviceTitle">Детали услуги</h3>
          <button
            id="closeServiceModalBtn"
            class="text-gray-500 hover:text-gray-700"
          >
            <i class="ri-close-line text-2xl"></i>
          </button>
        </div>
        <div id="serviceContent" class="space-y-6">
          <!-- Содержимое будет добавлено динамически -->
        </div>
      </div>
    </div>
    <div
      id="costCalculatorModal"
      class="fixed inset-0 bg-black/50 z-50 hidden flex items-center justify-center"
    >
      <div
        class="bg-blue-100 rounded-lg p-8 max-w-2xl w-full mx-4 text-gray-800 border border-blue-300"
      >
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-2xl font-bold">Расчет стоимости кровельных работ</h3>
          <button id="closeModalBtn" class="text-gray-500 hover:text-gray-700">
            <i class="ri-close-line text-2xl"></i>
          </button>
        </div>
        <form id="costCalculatorForm">
          <div class="mb-6">
            <label class="block text-gray-700 mb-2" for="roofType"
              >Тип кровли</label
            >
            <select
              id="roofType"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary pr-8 bg-white text-gray-800 border-gray-300"
            >
              <option value="">Выберите тип кровли</option>
              <option value="metal">Металлочерепица (700 ₽/м²)</option>
              <option value="soft">Мягкая кровля (500 ₽/м²)</option>
              <option value="soft-garage">
                Мягкая кровля для гаража/ангара (500 ₽/м²)
              </option>
              <option value="bitumen-roll">
                Рулонные битумные покрытия (200 ₽/м²)
              </option>
              <option value="bitumen-polymer">
                Рулонные битумно-полимерные покрытия (300 ₽/м²)
              </option>
              <option value="ondulin">Ондулиновое покрытие (300 ₽/м²)</option>
              <option value="other">Другое</option>
            </select>
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 mb-2" for="roofArea"
              >Площадь кровли (м²)</label
            >
            <input
              type="number"
              id="roofArea"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-800 border-gray-300"
              required
            />
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 mb-2" for="roofComplexity"
              >Сложность кровли</label
            >
            <select
              id="roofComplexity"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary pr-8 bg-white text-gray-800 border-gray-300"
            >
              <option value="simple">Простая (односкатная)</option>
              <option value="medium" selected>Средняя (двускатная)</option>
              <option value="complex">Сложная (многоскатная)</option>
            </select>
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 mb-2" for="clientName"
              >Ваше имя</label
            >
            <input
              type="text"
              id="clientName"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-800 border-gray-300"
              required
            />
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 mb-2" for="clientPhone"
              >Телефон</label
            >
            <input
              type="tel"
              id="clientPhone"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-800 border-gray-300"
              required
            />
          </div>
          <button
            type="submit"
            class="w-full bg-primary text-blue-950 py-3 !rounded-button hover:bg-primary/90 font-semibold"
          >
            Получить расчет
          </button>
          <p class="text-sm text-gray-500 mt-4 text-center">
            Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
          </p>
        </form>
      </div>
    </div>
    <script>
      document.addEventListener("DOMContentLoaded", function () {
        // Плавная прокрутка для всех навигационных ссылок
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        navLinks.forEach((link) => {
          link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const section = this.getAttribute("data-section");
            if (targetId === "#") {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            } else {
              const targetElement = document.querySelector(targetId);
              if (targetElement) {
                const headerHeight = document.querySelector("header").offsetHeight;
                const targetPosition =
                  targetElement.getBoundingClientRect().top +
                  window.scrollY -
                  headerHeight;
                window.scrollTo({
                  top: targetPosition,
                  behavior: "smooth",
                });
              }
            }
            // Обновляем активную ссылку
            setTimeout(() => {
              document.querySelectorAll(".nav-link").forEach((navLink) => {
                navLink.classList.remove(
                  "text-primary",
                  "border-b-2",
                  "border-primary",
                );
                navLink.classList.add("text-gray-200");
              });
              this.classList.remove("text-gray-200");
              this.classList.add("text-primary", "border-b-2", "border-primary");
            }, 100);
          });
        });
        // Функция для определения текущего раздела при прокрутке
        function updateActiveNavLink() {
          const scrollPosition = window.scrollY;
          const headerHeight = document.querySelector("header").offsetHeight;
          const windowHeight = window.innerHeight;
          const middleOfViewport = scrollPosition + windowHeight / 2;
          // Определяем, какой раздел сейчас в видимой области
          const sections = [
            {
              id: "home",
              top: 0,
              bottom: document.querySelector("#about")?.offsetTop || windowHeight,
            }, // Верх страницы
            {
              id: "about",
              top: document.querySelector("#about")?.offsetTop || 0,
              bottom: document.querySelector("#services")?.offsetTop || 0,
            },
            {
              id: "services",
              top: document.querySelector("#services")?.offsetTop || 0,
              bottom: document.querySelector("#testimonials")?.offsetTop || 0,
            },
            {
              id: "testimonials",
              top: document.querySelector("#testimonials")?.offsetTop || 0,
              bottom: document.querySelector("#contacts")?.offsetTop || 0,
            },
            {
              id: "contacts",
              top: document.querySelector("#contacts")?.offsetTop || 0,
              bottom: document.body.scrollHeight,
            },
          ];
          // Находим текущий активный раздел - тот, в котором находится середина экрана
          let currentSection = "home";
          for (const section of sections) {
            if (
              middleOfViewport >= section.top &&
              middleOfViewport < section.bottom
            ) {
              currentSection = section.id;
              break;
            }
          }
          // Если мы в самом низу страницы, активируем последний раздел
          if (scrollPosition + windowHeight >= document.body.scrollHeight - 10) {
            currentSection = "contacts";
          }
          // Обновляем активную ссылку в навигации
          document.querySelectorAll(".nav-link").forEach((link) => {
            const section = link.getAttribute("data-section");
            if (section === currentSection) {
              if (!link.classList.contains("text-primary")) {
                link.classList.remove("text-gray-200");
                link.classList.add("text-primary", "border-b-2", "border-primary");
              }
            } else {
              if (link.classList.contains("text-primary")) {
                link.classList.remove("text-primary", "border-b-2", "border-primary");
                link.classList.add("text-gray-200");
              }
            }
          });
        }
        // Вызываем функцию при загрузке и при прокрутке
        setTimeout(updateActiveNavLink, 500); // Увеличиваем задержку для корректной инициализации
        window.addEventListener("scroll", function () {
          requestAnimationFrame(updateActiveNavLink);
        });
        // Добавляем обработчик изменения размера окна для пересчета позиций секций
        window.addEventListener("resize", function () {
          setTimeout(updateActiveNavLink, 500);
        });
        // Модальное окно расчета стоимости
        const calculateCostBtn = document.getElementById("calculateCostBtn");
        const costCalculatorModal = document.getElementById("costCalculatorModal");
        const closeModalBtn = document.getElementById("closeModalBtn");
        const costCalculatorForm = document.getElementById("costCalculatorForm");
        calculateCostBtn.addEventListener("click", function () {
          costCalculatorModal.classList.remove("hidden");
          document.body.style.overflow = "hidden";
        });
        closeModalBtn.addEventListener("click", function () {
          costCalculatorModal.classList.add("hidden");
          document.body.style.overflow = "";
        });
        costCalculatorModal.addEventListener("click", function (e) {
          if (e.target === costCalculatorModal) {
            costCalculatorModal.classList.add("hidden");
            document.body.style.overflow = "";
          }
        });
        costCalculatorForm.addEventListener("submit", function (e) {
          e.preventDefault();
          const roofType = document.getElementById("roofType").value;
          const roofArea = document.getElementById("roofArea").value;
          const roofComplexity = document.getElementById("roofComplexity").value;
          const clientName = document.getElementById("clientName").value;
          const clientPhone = document.getElementById("clientPhone").value;
          if (!roofType || !roofArea || !clientName || !clientPhone) {
            const errorMessage = document.createElement("div");
            errorMessage.className = "text-red-500 mt-4 text-center";
            errorMessage.textContent = "Пожалуйста, заполните все обязательные поля";
            const existingError = costCalculatorForm.querySelector(".text-red-500");
            if (existingError) {
              existingError.remove();
            }
            costCalculatorForm.appendChild(errorMessage);
            return;
          }
          // Здесь можно добавить отправку данных на сервер
          // Для демонстрации просто показываем сообщение об успехе
          costCalculatorForm.innerHTML = `
      <div class="text-center py-8">
      <div class="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
      <i class="ri-check-line text-green-600 text-3xl"></i>
      </div>
      <h4 class="text-xl font-semibold mb-2">Спасибо за заявку!</h4>
      <p class="text-gray-600 mb-6">Мы свяжемся с вами в ближайшее время для уточнения деталей и предоставления расчета стоимости.</p>
      <button id="closeSuccessBtn" class="bg-primary text-blue-950 px-6 py-2 !rounded-button hover:bg-primary/90 font-semibold">
      Закрыть
      </button>
      </div>
      `;
          document
            .getElementById("closeSuccessBtn")
            .addEventListener("click", function () {
              costCalculatorModal.classList.add("hidden");
              document.body.style.overflow = "";
              // Восстанавливаем форму после закрытия
              setTimeout(() => {
                costCalculatorForm.innerHTML = `
      <div class="mb-6">
      <label class="block text-gray-700 mb-2" for="roofType">Тип кровли</label>
      <select id="roofType" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary pr-8 bg-white text-gray-800 border-gray-300">
      <option value="">Выберите тип кровли</option>
      <option value="metal">Металлочерепица (700 ₽/м²)</option>
      <option value="soft">Мягкая кровля (500 ₽/м²)</option>
      <option value="soft-garage">Мягкая кровля для гаража/ангара (500 ₽/м²)</option>
      <option value="bitumen-roll">Рулонные битумные покрытия (200 ₽/м²)</option>
      <option value="bitumen-polymer">Рулонные битумно-полимерные покрытия (300 ₽/м²)</option>
      <option value="ondulin">Ондулиновое покрытие (300 ₽/м²)</option>
      <option value="other">Другое</option>
      </select>
      </div>
      <div class="mb-6">
      <label class="block text-gray-700 mb-2" for="roofArea">Площадь кровли (м²)</label>
      <input type="number" id="roofArea" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-800 border-gray-300" required>
      </div>
      <div class="mb-6">
      <label class="block text-gray-700 mb-2" for="roofComplexity">Сложность кровли</label>
      <select id="roofComplexity" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary pr-8 bg-white text-gray-800 border-gray-300">
      <option value="simple">Простая (односкатная)</option>
      <option value="medium" selected>Средняя (двускатная)</option>
      <option value="complex">Сложная (многоскатная)</option>
      </select>
      </div>
      <div class="mb-6">
      <label class="block text-gray-700 mb-2" for="clientName">Ваше имя</label>
      <input type="text" id="clientName" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-800 border-gray-300" required>
      </div>
      <div class="mb-6">
      <label class="block text-gray-700 mb-2" for="clientPhone">Телефон</label>
      <input type="tel" id="clientPhone" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-800 border-gray-300" required>
      </div>
      <button type="submit" class="w-full bg-primary text-blue-950 py-3 !rounded-button hover:bg-primary/90 font-semibold">
      Получить расчет
      </button>
      <p class="text-sm text-gray-500 mt-4 text-center">
      Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
      </p>
      `;
              }, 300);
            });
        });
      });
    </script>
    <header class="fixed top-0 left-0 right-0 bg-blue-950 shadow-md z-50">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-20">
          <div class="flex items-center">
            <div
              class="w-12 h-12 mr-2 bg-primary rounded-full flex items-center justify-center"
            >
              <i class="ri-home-roof-fill text-blue-950 text-2xl"></i>
            </div>
            <a href="#home" class="text-3xl font-['Pacifico'] text-white"
              >Алан-Кровля</a
            >
          </div>
          <nav class="hidden md:flex space-x-8">
            <a
              href="#home"
              class="nav-link text-gray-200 hover:text-primary pb-1"
              data-section="home"
              >Главная</a
            >
            <a
              href="#about"
              class="nav-link text-gray-200 hover:text-primary pb-1"
              data-section="about"
              >О компании</a
            >
            <a
              href="#services"
              class="nav-link text-gray-200 hover:text-primary pb-1"
              data-section="services"
              >Услуги</a
            >
            <a
              href="#testimonials"
              class="nav-link text-gray-200 hover:text-primary pb-1"
              data-section="testimonials"
              >Отзывы</a
            >
            <a
              href="#contacts"
              class="nav-link text-gray-200 hover:text-primary pb-1"
              data-section="contacts"
              >Контакты</a
            >
          </nav>
          <div class="flex items-center space-x-4">
            <a href="tel:+79271661433" class="text-white font-medium"
              >+7 (927) 166-14-33</a
            >
            <button
              id="headerCallbackBtn"
              class="bg-primary text-blue-950 px-4 py-2 !rounded-button hover:bg-primary/90 whitespace-nowrap font-semibold"
            >
              Заказать звонок
            </button>
          </div>
        </div>
      </div>
    </header>
    <main class="pt-20">
      <section
        id="home"
        class="hero-section min-h-[600px] flex items-center relative"
        style="background-image: url('https://public.readdy.ai/ai/img_res/02f4a8577c145571e3dcba96682d3b45.jpg'); background-size: cover; background-position: center;"
        data-section="home"
      >
        <div class="absolute inset-0 bg-black/50"></div>
        <div class="container mx-auto px-4 relative z-10">
          <div class="max-w-2xl text-white">
            <h1 class="text-5xl font-bold mb-6">
              Ремонт и монтаж кровли в Саратове и области
            </h1>
            <p class="text-xl mb-8">
              Качественные кровельные работы с гарантией до 30 лет.
              Специализируемся на мягкой кровле для гаражей и ангаров.
              Бесплатный выезд в любую точку Саратовской области.
            </p>
            <button
              id="calculateCostBtn"
              class="bg-primary text-blue-950 px-8 py-4 !rounded-button text-lg hover:bg-primary/90 whitespace-nowrap font-semibold"
            >
              Рассчитать стоимость
            </button>
          </div>
        </div>
      </section>
      <section id="about" class="py-20 bg-white">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold text-center mb-12">О компании</h2>
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://static.readdy.ai/image/182d7354276658ca01c1223de265a3c0/84cc6fb727cfb6793c418763a2308819.jpeg"
                alt="Команда Алан-Кровля"
                class="w-full h-auto rounded-lg shadow-md"
              />
            </div>
            <div>
              <h3 class="text-2xl font-semibold mb-4">
                Алан-Кровля - ваш надежный партнер с 2010 года
              </h3>
              <p class="text-gray-600 mb-6">
                Компания "Алан-Кровля" - это семейный бизнес, который
                специализируется на предоставлении полного спектра кровельных
                услуг в Саратове и Саратовской области. За более чем 15 лет
                работы мы успешно реализовали свыше 1500 проектов различной
                сложности - от небольших частных домов до крупных коммерческих
                объектов.
              </p>
              <div class="space-y-4 mb-6">
                <div class="flex items-start">
                  <div
                    class="w-10 h-10 mr-4 bg-primary rounded-full flex items-center justify-center flex-shrink-0"
                  >
                    <i class="ri-medal-line text-blue-950"></i>
                  </div>
                  <div>
                    <h4 class="font-semibold mb-1">Профессиональная команда</h4>
                    <p class="text-gray-600">
                      В нашей команде работают только квалифицированные
                      специалисты с опытом работы от 5 лет. Все сотрудники
                      регулярно проходят обучение новым технологиям.
                    </p>
                  </div>
                </div>
                <div class="flex items-start">
                  <div
                    class="w-10 h-10 mr-4 bg-primary rounded-full flex items-center justify-center flex-shrink-0"
                  >
                    <i class="ri-tools-line text-blue-950"></i>
                  </div>
                  <div>
                    <h4 class="font-semibold mb-1">Современное оборудование</h4>
                    <p class="text-gray-600">
                      Используем профессиональное оборудование и инструменты,
                      что позволяет выполнять работы быстро и качественно.
                    </p>
                  </div>
                </div>
                <div class="flex items-start">
                  <div
                    class="w-10 h-10 mr-4 bg-primary rounded-full flex items-center justify-center flex-shrink-0"
                  >
                    <i class="ri-shield-check-line text-blue-950"></i>
                  </div>
                  <div>
                    <h4 class="font-semibold mb-1">Гарантия качества</h4>
                    <p class="text-gray-600">
                      Предоставляем гарантию до 30 лет на выполненные работы.
                      Работаем через ИП со всеми необходимыми договорами.
                    </p>
                  </div>
                </div>
              </div>
              <div class="bg-blue-100 p-6 rounded-lg border border-blue-300">
                <h4 class="font-semibold mb-2">Наши принципы работы:</h4>
                <ul class="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Индивидуальный подход к каждому клиенту</li>
                  <li>Соблюдение технологий и строительных норм</li>
                  <li>Использование только сертифицированных материалов</li>
                  <li>Прозрачное ценообразование без скрытых платежей</li>
                  <li>Строгое соблюдение сроков выполнения работ</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="py-20 bg-blue-200">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold text-center mb-12">
            Наши преимущества
          </h2>
          <div class="grid md:grid-cols-4 gap-8">
            <div class="text-center">
              <div
                class="w-16 h-16 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center"
              >
                <i class="ri-time-line text-blue-950 text-2xl"></i>
              </div>
              <h3 class="text-xl font-semibold mb-2">Опыт с 2010 года</h3>
              <p class="text-gray-600">
                Успешно реализовали более 1000 проектов
              </p>
            </div>
            <div class="text-center">
              <div
                class="w-16 h-16 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center"
              >
                <i class="ri-shield-check-line text-blue-950 text-2xl"></i>
              </div>
              <h3 class="text-xl font-semibold mb-2">Гарантия до 30 лет</h3>
              <p class="text-gray-600">
                Официальный договор и гарантийные обязательства
              </p>
            </div>
            <div class="text-center">
              <div
                class="w-16 h-16 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center"
              >
                <i class="ri-team-line text-blue-950 text-2xl"></i>
              </div>
              <h3 class="text-xl font-semibold mb-2">
                Бесплатная консультация
              </h3>
              <p class="text-gray-600">
                Выезд специалиста и составление сметы бесплатно
              </p>
            </div>
            <div class="text-center">
              <div
                class="w-16 h-16 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center"
              >
                <i class="ri-percent-line text-blue-950 text-2xl"></i>
              </div>
              <h3 class="text-xl font-semibold mb-2">Скидка 20%</h3>
              <p class="text-gray-600">Пенсионерам, ветеранам ВОВ и СВО</p>
            </div>
          </div>
        </div>
      </section>
      <section id="services" class="py-20 bg-gray-50">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold text-center mb-12">Наши услуги</h2>
          <div class="grid md:grid-cols-4 gap-8">
            <div
              class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-blue-200"
            >
              <img
                src="https://static.readdy.ai/image/182d7354276658ca01c1223de265a3c0/132603e46cdfc512a4e0464e51745871.jpeg"
                alt="Монтаж кровли"
                class="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 class="text-xl font-semibold mb-2">Монтаж кровли</h3>
              <p class="text-gray-400 mb-4">
                Профессиональный монтаж всех видов кровельных материалов
              </p>
              <button
                class="text-primary hover:text-primary/80 flex items-center service-details-btn"
                data-service="1"
              >
                Подробнее
                <i class="ri-arrow-right-line ml-2"></i>
              </button>
            </div>
            <div
              class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-blue-200"
            >
              <img
                src="https://static.readdy.ai/image/182d7354276658ca01c1223de265a3c0/009729d642dc73befa98feb91bfd1163.jpeg"
                alt="Ремонт кровли"
                class="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 class="text-xl font-semibold mb-2">Ремонт кровли</h3>
              <p class="text-gray-500 mb-4">
                Оперативный ремонт протечек и повреждений любой сложности
              </p>
              <button
                class="text-primary hover:text-primary/80 flex items-center service-details-btn"
                data-service="2"
              >
                Подробнее
                <i class="ri-arrow-right-line ml-2"></i>
              </button>
            </div>
            <div
              class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-blue-200"
            >
              <img
                src="https://public.readdy.ai/ai/img_res/7aa9d3646b8db6c37b58b7cd5d50ed91.jpg"
                alt="Утепление кровли"
                class="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 class="text-xl font-semibold mb-2">Утепление кровли</h3>
              <p class="text-gray-500 mb-4">
                Современные решения для теплоизоляции вашей крыши
              </p>
              <button
                class="text-primary hover:text-primary/80 flex items-center service-details-btn"
                data-service="3"
              >
                Подробнее
                <i class="ri-arrow-right-line ml-2"></i>
              </button>
            </div>
            <div
              class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-blue-200"
            >
              <img
                src="https://static.readdy.ai/image/182d7354276658ca01c1223de265a3c0/0f4936616c57d76d101cb689fa224d7a.jpeg"
                alt="Мягкая кровля для гаражей"
                class="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 class="text-xl font-semibold mb-2">
                Мягкая кровля для гаражей и ангаров
              </h3>
              <p class="text-gray-500 mb-4">
                Специализируемся на монтаже мягкой кровли для гаражей, ангаров и
                хозпостроек. Также устанавливаем заборы из профлиста.
              </p>
              <button
                class="text-primary hover:text-primary/80 flex items-center service-details-btn"
                data-service="4"
              >
                Подробнее
                <i class="ri-arrow-right-line ml-2"></i>
              </button>
            </div>
          </div>
        </div>
      </section>
      <section
        id="testimonials"
        class="py-20 bg-blue-200"
        data-section="testimonials"
      >
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold text-center mb-12">
            Отзывы наших клиентов
          </h2>
          <div class="grid md:grid-cols-4 gap-8">
            <div
              class="bg-white p-6 rounded-lg shadow-md border border-blue-200"
            >
              <div class="flex items-center mb-4">
                <div
                  class="w-12 h-12 bg-primary/50 rounded-full flex items-center justify-center"
                >
                  <i class="ri-user-line text-primary"></i>
                </div>
                <div class="ml-4">
                  <h4 class="font-semibold">Александр Петров</h4>
                  <p class="text-gray-400">Энгельс</p>
                </div>
              </div>
              <p class="text-gray-600">
                "Отличная работа! Команда профессионалов выполнила монтаж кровли
                точно в срок. Качество на высоте, цена порадовала. Всем
                рекомендую!"
              </p>
            </div>
            <div
              class="bg-white p-6 rounded-lg shadow-md border border-blue-200"
            >
              <div class="flex items-center mb-4">
                <div
                  class="w-12 h-12 bg-primary/50 rounded-full flex items-center justify-center"
                >
                  <i class="ri-user-line text-primary"></i>
                </div>
                <div class="ml-4">
                  <h4 class="font-semibold">Елена Соколова</h4>
                  <p class="text-gray-500">Балаково</p>
                </div>
              </div>
              <p class="text-gray-600">
                "Благодарю за профессиональный подход к делу. Особенно
                порадовала гарантия на работы и материалы. Мастера работали
                быстро и аккуратно."
              </p>
            </div>
            <div
              class="bg-white p-6 rounded-lg shadow-md border border-blue-200"
            >
              <div class="flex items-center mb-4">
                <div
                  class="w-12 h-12 bg-primary/50 rounded-full flex items-center justify-center"
                >
                  <i class="ri-user-line text-primary"></i>
                </div>
                <div class="ml-4">
                  <h4 class="font-semibold">Дмитрий Иванов</h4>
                  <p class="text-gray-500">Вольск</p>
                </div>
              </div>
              <p class="text-gray-600">
                "Сделали все быстро и качественно. Отдельное спасибо за
                консультацию по выбору материалов и помощь с расчетами. Очень
                доволен результатом."
              </p>
            </div>
            <div
              class="bg-white p-6 rounded-lg shadow-md border border-blue-200"
            >
              <div class="flex items-center mb-4">
                <div
                  class="w-12 h-12 bg-primary/50 rounded-full flex items-center justify-center"
                >
                  <i class="ri-user-line text-primary"></i>
                </div>
                <div class="ml-4">
                  <h4 class="font-semibold">Сергей Кузнецов</h4>
                  <p class="text-gray-500">Саратов</p>
                </div>
              </div>
              <p class="text-gray-600">
                "Заказывал монтаж мягкой кровли для гаражного комплекса. Работа
                выполнена профессионально, быстро и по доступной цене. Уже
                третий год никаких проблем с крышей. Рекомендую!"
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="contacts" class="py-20 bg-gray-100">
        <div class="container mx-auto px-4">
          <div class="max-w-2xl mx-auto">
            <h2 class="text-3xl font-bold text-center mb-12">
              Получить бесплатную консультацию
            </h2>
            <form
              id="contactForm"
              class="bg-white p-8 rounded-lg shadow-md border border-blue-200"
            >
              <div class="mb-6">
                <label class="block text-gray-700 mb-2" for="name"
                  >Ваше имя</label
                >
                <input
                  type="text"
                  id="name"
                  class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-800 border-gray-300"
                  required
                />
              </div>
              <div class="mb-6">
                <label class="block text-gray-700 mb-2" for="phone"
                  >Телефон</label
                >
                <input
                  type="tel"
                  id="phone"
                  class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-800 border-gray-300"
                  required
                />
              </div>
              <div class="mb-6">
                <label class="block text-gray-700 mb-2" for="service"
                  >Тип кровли</label
                >
                <select
                  id="service"
                  class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary pr-8 bg-white text-gray-800 border-gray-300"
                >
                  <option value="">Выберите тип кровли</option>
                  <option value="metal">Металлочерепица (700 ₽/м²)</option>
                  <option value="soft">Мягкая кровля (500 ₽/м²)</option>
                  <option value="soft-garage">
                    Мягкая кровля для гаража/ангара (500 ₽/м²)
                  </option>
                  <option value="bitumen-roll">
                    Рулонные битумные покрытия (200 ₽/м²)
                  </option>
                  <option value="bitumen-polymer">
                    Рулонные битумно-полимерные покрытия (300 ₽/м²)
                  </option>
                  <option value="ondulin">
                    Ондулиновое покрытие (300 ₽/м²)
                  </option>
                  <option value="other">Другое</option>
                </select>
              </div>
              <div class="mb-6">
                <label class="block text-gray-700 mb-2" for="message"
                  >Комментарий</label
                >
                <textarea
                  id="message"
                  rows="4"
                  class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-800 border-gray-300"
                ></textarea>
              </div>
              <button
                type="submit"
                class="w-full bg-primary text-blue-950 py-3 !rounded-button hover:bg-primary/90 font-semibold"
              >
                Отправить заявку
              </button>
              <p class="text-sm text-gray-500 mt-4 text-center">
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
    <footer class="bg-blue-950 text-white py-12">
      <div class="container mx-auto px-4">
        <div class="grid md:grid-cols-4 gap-8">
          <div>
            <div class="flex items-center mb-4">
              <div
                class="w-12 h-12 mr-2 bg-primary rounded-full flex items-center justify-center"
              >
                <i class="ri-home-roof-fill text-blue-950 text-2xl"></i>
              </div>
              <a href="#home" class="text-3xl font-['Pacifico'] text-white"
                >Алан-Кровля</a
              >
            </div>
            <p class="text-gray-300">
              Профессиональный монтаж кровли в Саратовской Области
            </p>
          </div>
          <div>
            <h4 class="text-lg font-semibold mb-4">Контакты</h4>
            <p class="mb-2">
              Телефон:
              <a href="tel:+79271661433" class="hover:text-primary"
                >+7 (927) 166-14-33</a
              >,
              <a href="tel:+79273041433" class="hover:text-primary"
                >+7 (927) 304-14-33</a
              >
            </p>
            <p class="mb-2">
              Email:
              <a href="mailto:alankrovlya@gmail.com" class="hover:text-primary"
                >alankrovlya@gmail.com</a
              >
            </p>
            <p>Адрес: г. Саратов, ул. Строителей, д. 10</p>
          </div>
          <div>
            <h4 class="text-lg font-semibold mb-4">Режим работы</h4>
            <p class="mb-2">Пн-Пт: 9:00 - 18:00</p>
            <p class="mb-2">Сб: 10:00 - 16:00</p>
            <p>Вс: выходной</p>
          </div>
          <div>
            <h4 class="text-lg font-semibold mb-4">Социальные сети</h4>
            <div class="flex space-x-4">
              <a href="https://t.me/AlanKrovlya" class="hover:text-primary">
                <i class="ri-telegram-line text-2xl"></i>
              </a>
              <a
                href="https://wa.me/message/GNNXLNFM62NTI1"
                class="hover:text-primary"
              >
                <i class="ri-whatsapp-line text-2xl"></i>
              </a>
              <a href="https://vk.com/alankrovlya" class="hover:text-primary">
                <i class="ri-vk-line text-2xl"></i>
              </a>
            </div>
          </div>
        </div>
        <div
          class="border-t border-blue-800 mt-8 pt-8 text-center text-gray-300"
        >
          <p>© 2025 Алан-Кровля. Все права защищены.</p>
        </div>
      </div>
    </footer>
    <div class="fixed bottom-8 right-8 flex flex-col space-y-4">
      <a
        href="https://wa.me/message/GNNXLNFM62NTI1"
        target="_blank"
        class="w-12 h-12 bg-green-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-green-600"
      >
        <i class="ri-whatsapp-line text-xl"></i>
      </a>
      <a
        href="https://t.me/AlanKrovlya"
        target="_blank"
        class="w-12 h-12 bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600"
      >
        <i class="ri-telegram-line text-xl"></i>
      </a>
      <a
        href="https://vk.com/alankrovlya"
        target="_blank"
        class="w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700"
      >
        <i class="ri-vk-line text-xl"></i>
      </a>
      <button
        id="callbackBtn"
        class="w-12 h-12 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary/90"
      >
        <i class="ri-phone-line text-xl"></i>
      </button>
    </div>
    <div
      id="callbackModal"
      class="fixed inset-0 bg-black/50 z-50 hidden flex items-center justify-center"
    >
      <div
        class="bg-blue-100 rounded-lg p-8 max-w-md w-full mx-4 text-gray-800 border border-blue-300"
      >
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-2xl font-bold">Заказать обратный звонок</h3>
          <button
            id="closeCallbackModalBtn"
            class="text-gray-500 hover:text-gray-700"
          >
            <i class="ri-close-line text-2xl"></i>
          </button>
        </div>
        <form id="callbackForm">
          <div class="mb-6">
            <label class="block text-gray-700 mb-2" for="callbackName"
              >Ваше имя</label
            >
            <input
              type="text"
              id="callbackName"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-800 border-gray-300"
              required
            />
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 mb-2" for="callbackPhone"
              >Телефон</label
            >
            <input
              type="tel"
              id="callbackPhone"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-800 border-gray-300"
              required
            />
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 mb-2" for="callbackTime"
              >Удобное время для звонка</label
            >
            <select
              id="callbackTime"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary pr-8 bg-white text-gray-800 border-gray-300"
            >
              <option value="asap">Как можно скорее</option>
              <option value="morning">Утро (9:00 - 12:00)</option>
              <option value="afternoon">День (12:00 - 15:00)</option>
              <option value="evening">Вечер (15:00 - 18:00)</option>
            </select>
          </div>
          <button
            type="submit"
            class="w-full bg-primary text-blue-950 py-3 !rounded-button hover:bg-primary/90 font-semibold"
          >
            Заказать звонок
          </button>
          <p class="text-sm text-gray-500 mt-4 text-center">
            Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
          </p>
        </form>
      </div>
    </div>
    <script>
      document.addEventListener("DOMContentLoaded", function () {
        // Обработчики для модального окна обратного звонка
        const callbackBtn = document.getElementById("callbackBtn");
        const headerCallbackBtn = document.getElementById("headerCallbackBtn");
        const callbackModal = document.getElementById("callbackModal");
        const closeCallbackModalBtn = document.getElementById(
          "closeCallbackModalBtn",
        );
        const callbackForm = document.getElementById("callbackForm");
        const contactForm = document.getElementById("contactForm");
        function openCallbackModal() {
          callbackModal.classList.remove("hidden");
          document.body.style.overflow = "hidden";
        }
        function closeCallbackModal() {
          callbackModal.classList.add("hidden");
          document.body.style.overflow = "";
        }
        callbackBtn.addEventListener("click", openCallbackModal);
        headerCallbackBtn.addEventListener("click", openCallbackModal);
        closeCallbackModalBtn.addEventListener("click", closeCallbackModal);
        callbackModal.addEventListener("click", function (e) {
          if (e.target === callbackModal) {
            closeCallbackModal();
          }
        });
        callbackForm.addEventListener("submit", function (e) {
          e.preventDefault();
          const callbackName = document.getElementById("callbackName").value;
          const callbackPhone = document.getElementById("callbackPhone").value;
          if (!callbackName || !callbackPhone) {
            const errorMessage = document.createElement("div");
            errorMessage.className = "text-red-500 mt-4 text-center";
            errorMessage.textContent = "Пожалуйста, заполните все обязательные поля";
            const existingError = callbackForm.querySelector(".text-red-500");
            if (existingError) {
              existingError.remove();
            }
            callbackForm.appendChild(errorMessage);
            return;
          }
          // Здесь можно добавить отправку данных на сервер
          // Для демонстрации просто показываем сообщение об успехе
          callbackForm.innerHTML = `
      <div class="text-center py-8">
      <div class="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
      <i class="ri-check-line text-green-600 text-3xl"></i>
      </div>
      <h4 class="text-xl font-semibold mb-2">Спасибо за заявку!</h4>
      <p class="text-gray-600 mb-6">Мы перезвоним вам в ближайшее время.</p>
      <button id="closeCallbackSuccessBtn" class="bg-primary text-blue-950 px-6 py-2 !rounded-button hover:bg-primary/90 font-semibold">
      Закрыть
      </button>
      </div>
      `;
          document
            .getElementById("closeCallbackSuccessBtn")
            .addEventListener("click", function () {
              closeCallbackModal();
              // Восстанавливаем форму после закрытия
              setTimeout(() => {
                callbackForm.innerHTML = `
      <div class="mb-6">
      <label class="block text-gray-700 mb-2" for="callbackName">Ваше имя</label>
      <input type="text" id="callbackName" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-800 border-gray-300" required>
      </div>
      <div class="mb-6">
      <label class="block text-gray-700 mb-2" for="callbackPhone">Телефон</label>
      <input type="tel" id="callbackPhone" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-800 border-gray-300" required>
      </div>
      <div class="mb-6">
      <label class="block text-gray-700 mb-2" for="callbackTime">Удобное время для звонка</label>
      <select id="callbackTime" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary pr-8 bg-white text-gray-800 border-gray-300">
      <option value="asap">Как можно скорее</option>
      <option value="morning">Утро (9:00 - 12:00)</option>
      <option value="afternoon">День (12:00 - 15:00)</option>
      <option value="evening">Вечер (15:00 - 18:00)</option>
      </select>
      </div>
      <button type="submit" class="w-full bg-primary text-blue-950 py-3 !rounded-button hover:bg-primary/90 font-semibold">
      Заказать звонок
      </button>
      <p class="text-sm text-gray-500 mt-4 text-center">
      Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
      </p>
      `;
              }, 300);
            });
        });
        // Обработчик для формы контактов
        if (contactForm) {
          contactForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const name = document.getElementById("name").value;
            const phone = document.getElementById("phone").value;

            if (!name || !phone) {
              const errorMessage = document.createElement("div");
              errorMessage.className = "text-red-500 mt-4 text-center";
              errorMessage.textContent =
                "Пожалуйста, заполните все обязательные поля";
              const existingError = contactForm.querySelector(".text-red-500");
              if (existingError) {
                existingError.remove();
              }
              contactForm.appendChild(errorMessage);
              return;
            }

            // Здесь можно добавить отправку данных на сервер
            // Для демонстрации просто показываем сообщение об успехе
            contactForm.innerHTML = `
            <div class="text-center py-8">
              <div class="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <i class="ri-check-line text-green-600 text-3xl"></i>
              </div>
              <h4 class="text-xl font-semibold mb-2">Спасибо за заявку!</h4>
              <p class="text-gray-600 mb-6">Мы свяжемся с вами в ближайшее время для уточнения деталей.</p>
              <button id="closeContactSuccessBtn" class="bg-primary text-blue-950 px-6 py-2 !rounded-button hover:bg-primary/90 font-semibold">
                Закрыть
              </button>
            </div>
          `;

            document
              .getElementById("closeContactSuccessBtn")
              .addEventListener("click", function () {
                // Восстанавливаем форму
                contactForm.innerHTML = `
              <div class="mb-6">
                <label class="block text-gray-700 mb-2" for="name">Ваше имя</label>
                <input type="text" id="name" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-800 border-gray-300" required>
              </div>
              <div class="mb-6">
                <label class="block text-gray-700 mb-2" for="phone">Телефон</label>
                <input type="tel" id="phone" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-800 border-gray-300" required>
              </div>
              <div class="mb-6">
                <label class="block text-gray-700 mb-2" for="service">Тип кровли</label>
                <select id="service" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary pr-8 bg-white text-gray-800 border-gray-300">
                  <option value="">Выберите тип кровли</option>
                  <option value="metal">Металлочерепица (700 ₽/м²)</option>
                  <option value="soft">Мягкая кровля (500 ₽/м²)</option>
                  <option value="soft-garage">Мягкая кровля для гаража/ангара (500 ₽/м²)</option>
                  <option value="bitumen-roll">Рулонные битумные покрытия (200 ₽/м²)</option>
                  <option value="bitumen-polymer">Рулонные битумно-полимерные покрытия (300 ₽/м²)</option>
                  <option value="ondulin">Ондулиновое покрытие (300 ₽/м²)</option>
                  <option value="other">Другое</option>
                </select>
              </div>
              <div class="mb-6">
                <label class="block text-gray-700 mb-2" for="message">Комментарий</label>
                <textarea id="message" rows="4" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-800 border-gray-300"></textarea>
              </div>
              <button type="submit" class="w-full bg-primary text-blue-950 py-3 !rounded-button hover:bg-primary/90 font-semibold">
                Отправить заявку
              </button>
              <p class="text-sm text-gray-500 mt-4 text-center">
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
              </p>
            `;
              });
          });
        }
        // Модальное окно для подробностей об услугах
        const serviceDetailsModal = document.getElementById("serviceDetailsModal");
        const closeServiceModalBtn = document.getElementById("closeServiceModalBtn");
        const serviceTitle = document.getElementById("serviceTitle");
        const serviceContent = document.getElementById("serviceContent");
        // Данные услуг
        const servicesData = {
          1: {
            title: "Монтаж кровли",
            description:
              "Профессиональный монтаж всех видов кровельных материалов с соблюдением технологий и стандартов качества. Наша компания специализируется на установке различных типов кровли для частных домов, коммерческих и промышленных объектов с 2010 года.",
            materials: [
              "Пленочная кровля",
              "Листовая кровля",
              "Рулонная кровля",
              "Мастичная кровля",
              "Штучная кровля",
              "Металлочерепица",
              "Мягкая кровля",
              "Фальцевая кровля",
              "Композитная черепица",
              "Керамическая черепица",
              "Ондулин",
            ],
            process: [
              "Демонтаж старого кровельного покрытия (при необходимости)",
              "Проверка и ремонт стропильной системы",
              "Монтаж гидроизоляции",
              "Устройство обрешетки",
              "Монтаж кровельного материала",
              "Установка водосточной системы",
              "Монтаж снегозадержателей и других элементов безопасности",
            ],
            benefits: [
              "Гарантия на работы до 30 лет",
              "Использование только сертифицированных материалов Технониколь",
              "Соблюдение всех технологических норм и правил",
              "Опытные бригады с профильным образованием",
              "Контроль качества на всех этапах работ",
              "Скидка 20% пенсионерам, ветеранам ВОВ и СВО",
              "Бесплатный выезд специалиста в любую точку Саратовской области",
            ],
            price: "от 700 руб/м²",
            timeframe: "от 5 дней в зависимости от площади и сложности",
            images: [
              "https://static.readdy.ai/image/182d7354276658ca01c1223de265a3c0/132603e46cdfc512a4e0464e51745871.jpeg",
              "https://static.readdy.ai/image/182d7354276658ca01c1223de265a3c0/6683bea4a40493668b2dd02c4d4b8139.jpeg",
            ],
          },
          2: {
            title: "Ремонт кровли",
            description:
              "Оперативный и качественный ремонт кровли любой сложности. Устраняем протечки, повреждения и дефекты кровельного покрытия с гарантией результата.",
            problems: [
              "Протечки и затекания",
              "Повреждения кровельного покрытия",
              "Нарушение целостности гидроизоляции",
              "Деформация элементов кровли",
              "Повреждения после града или сильного ветра",
            ],
            solutions: [
              "Локальный ремонт поврежденных участков",
              "Полная замена кровельного покрытия (демонтаж от 150 ₽/м²)",
              "Восстановление гидроизоляции",
              "Ремонт примыканий и узлов",
              "Усиление стропильной системы (монтаж стропильных систем 1 200 ₽/м²)",
            ],
            benefits: [
              "Быстрый выезд на объект для оценки повреждений",
              "Оперативное устранение протечек",
              "Использование материалов, соответствующих существующей кровле",
              "Гарантия на выполненные работы",
              "Возможность аварийного ремонта в кратчайшие сроки",
            ],
            price: "от 150 руб/м² (демонтаж)",
            timeframe: "от 1 дня в зависимости от объема работ",
            images: [
              "https://static.readdy.ai/image/182d7354276658ca01c1223de265a3c0/009729d642dc73befa98feb91bfd1163.jpeg",
              "https://static.readdy.ai/image/182d7354276658ca01c1223de265a3c0/3988de874b316cf47900c37462e74db4.jpeg",
            ],
          },
          3: {
            title: "Утепление кровли",
            description:
              "Современные решения для теплоизоляции вашей крыши, которые помогут сократить расходы на отопление и создать комфортный микроклимат в доме.",
            materials: [
              "Минеральная вата",
              "Пенополистирол",
              "Пенополиуретан",
              "Эковата",
              "PIR-плиты",
            ],
            process: [
              "Оценка состояния существующей кровли",
              "Расчет необходимой толщины утеплителя",
              "Монтаж пароизоляции",
              "Укладка утеплителя",
              "Монтаж гидроизоляции",
              "Обеспечение вентиляции подкровельного пространства",
            ],
            benefits: [
              "Снижение теплопотерь до 30%",
              "Защита от образования конденсата",
              "Предотвращение образования наледи и сосулек",
              "Увеличение срока службы кровельного покрытия",
              "Улучшение звукоизоляции",
            ],
            price: "от 250 руб/м²",
            timeframe: "от 3 дней в зависимости от площади",
            images: [
              "https://public.readdy.ai/ai/img_res/747501736dbbdf7e75c6d9f70cce69b3.jpg",
              "https://public.readdy.ai/ai/img_res/e371d39f09c20d6263d835deb66a8ffd.jpg",
            ],
          },
          4: {
            title: "Мягкая кровля для гаражей и ангаров",
            description:
              "Специализированные решения для монтажа мягкой кровли на гаражах, ангарах и хозяйственных постройках. Надежная защита от протечек и долговечность эксплуатации. Также занимаемся установкой заборов из профлиста.",
            materials: [
              "Рулонные битумные материалы (Технониколь, Биполь, Унифлекс)",
              "Высокопрочные битумно-полимерные материалы",
              "Армированные материалы Технониколь",
              "Битумная черепица",
              "ПВХ мембраны",
              "ЭПДМ мембраны",
              "Профлист для заборов",
            ],
            process: [
              "Демонтаж старого покрытия (при необходимости)",
              "Подготовка основания",
              "Устройство стяжки (при необходимости)",
              "Огрунтовка поверхности",
              "Наплавление или укладка гидроизоляционного материала",
              "Устройство примыканий и водостоков",
              "Установка заборов из профлиста (при заказе)",
            ],
            benefits: [
              "Доступная стоимость материалов и работ",
              "Высокая скорость монтажа",
              "Надежная гидроизоляция",
              "Устойчивость к атмосферным воздействиям",
              "Срок службы до 30 лет",
              "Простота ремонта при необходимости",
              "Скидка 20% пенсионерам, ветеранам ВОВ и СВО",
              "Бесплатный выезд специалиста в любую точку Саратовской области",
              "Работаем через ИП со всеми необходимыми договорами и гарантиями",
              "Принимаем срочные заказы",
            ],
            price: "от 500 руб/м²",
            timeframe: "от 1-2 дней для стандартного гаража",
            images: [
              "https://static.readdy.ai/image/182d7354276658ca01c1223de265a3c0/3ee9a50945d64dab9101882b9b09a15c.jpeg",
              "https://public.readdy.ai/ai/img_res/a44b5901694ab161acc831f0726f5bdc.jpg",
            ],
          },
        };
        function openServiceModal(serviceId) {
          const service = servicesData[serviceId];
          if (!service) return;
          serviceTitle.textContent = service.title;
          let content = `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      ${service.images
        .map((img, index) => {
          // Заменяем URL изображений на URL без русского текста
          let newImg = img;
          if (img.includes("query=")) {
            newImg = img.replace(
              /query=([^&]+)/,
              "query=$1, professional quality photography, high resolution",
            );
          }
          // Заменяем первое изображение для услуги с id=1
          if (index === 0 && serviceId === "1") {
            newImg =
              "https://static.readdy.ai/image/182d7354276658ca01c1223de265a3c0/32c6bf97873206731533b42c6e58d537.jpeg";
          }
          return `
      <div>
      <img src="${newImg}" alt="${service.title}" class="w-full h-64 object-cover rounded-lg">
      </div>
      `;
        })
        .join("")}
      </div>
      <div class="mb-6">
      <h4 class="text-xl font-semibold mb-2">Описание услуги</h4>
      <p class="text-gray-600">${service.description}</p>
      </div>
      `;
          if (service.materials) {
            content += `
      <div class="mb-6">
      <h4 class="text-xl font-semibold mb-2">Используемые материалы</h4>
      <ul class="list-disc pl-5 text-gray-600">
      ${service.materials.map((material) => `<li>${material}</li>`).join("")}
      </ul>
      </div>
      `;
          }
          if (service.process) {
            content += `
      <div class="mb-6">
      <h4 class="text-xl font-semibold mb-2">Этапы работ</h4>
      <ol class="list-decimal pl-5 text-gray-600">
      ${service.process.map((step) => `<li>${step}</li>`).join("")}
      </ol>
      </div>
      `;
          }
          if (service.problems) {
            content += `
      <div class="mb-6">
      <h4 class="text-xl font-semibold mb-2">Решаемые проблемы</h4>
      <ul class="list-disc pl-5 text-gray-600">
      ${service.problems.map((problem) => `<li>${problem}</li>`).join("")}
      </ul>
      </div>
      `;
          }
          if (service.solutions) {
            content += `
      <div class="mb-6">
      <h4 class="text-xl font-semibold mb-2">Наши решения</h4>
      <ul class="list-disc pl-5 text-gray-600">
      ${service.solutions.map((solution) => `<li>${solution}</li>`).join("")}
      </ul>
      </div>
      `;
          }
          if (service.benefits) {
            content += `
      <div class="mb-6">
      <h4 class="text-xl font-semibold mb-2">Преимущества</h4>
      <ul class="list-disc pl-5 text-gray-600">
      ${service.benefits.map((benefit) => `<li>${benefit}</li>`).join("")}
      </ul>
      </div>
      `;
          }
          content += `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
      <div>
      <h4 class="text-xl font-semibold mb-2">Стоимость</h4>
      <p class="text-gray-600">${service.price}</p>
      </div>
      <div>
      <h4 class="text-xl font-semibold mb-2">Сроки выполнения</h4>
      <p class="text-gray-600">${service.timeframe}</p>
      </div>
      </div>
      <div class="mt-8 flex flex-wrap gap-4">
      <button id="orderServiceBtn" class="bg-primary text-blue-950 px-6 py-3 !rounded-button hover:bg-primary/90 font-semibold">
      Заказать услугу
      </button>
      <button id="calculateServiceCostBtn" class="bg-secondary text-white px-6 py-3 !rounded-button hover:bg-secondary/90 font-semibold">
      Рассчитать стоимость
      </button>
      </div>
      `;
          serviceContent.innerHTML = content;
          // Добавляем обработчики для кнопок
          document
            .getElementById("orderServiceBtn")
            .addEventListener("click", function () {
              closeServiceModal();
              openCallbackModal();
            });
          document
            .getElementById("calculateServiceCostBtn")
            .addEventListener("click", function () {
              closeServiceModal();
              document.getElementById("calculateCostBtn").click();
            });
          serviceDetailsModal.classList.remove("hidden");
          document.body.style.overflow = "hidden";
        }
        function closeServiceModal() {
          serviceDetailsModal.classList.add("hidden");
          document.body.style.overflow = "";
        }
        // Добавляем обработчики для кнопок "Подробнее" в разделе услуг
        document.querySelectorAll(".service-details-btn").forEach((btn) => {
          btn.addEventListener("click", function () {
            const serviceId = this.getAttribute("data-service");
            openServiceModal(serviceId);
          });
        });
        closeServiceModalBtn.addEventListener("click", closeServiceModal);
        serviceDetailsModal.addEventListener("click", function (e) {
          if (e.target === serviceDetailsModal) {
            closeServiceModal();
          }
        });
      });
    </script>
    <!-- Добавление JavaScript кода для отправки формы -->
<script>
  // Обработчик отправки формы
  document.getElementById("callbackForm").addEventListener("submit", async function (e) {
    e.preventDefault(); // предотвращаем обычную отправку формы

    const name = document.getElementById("callbackName").value;
    const phone = document.getElementById("callbackPhone").value;
    const time = document.getElementById("callbackTime").value;

    // Проверка, чтобы поля не были пустыми
    if (!name || !phone || !time) {
      alert("Пожалуйста, заполните все обязательные поля");
      return;
    }

    const formData = {
      name: name,
      phone: phone,
      service: time,
      message: "Заказ обратного звонка"
    };

    // Отправка данных на сервер через fetch
    try {
      const response = await fetch("/api/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert("Заявка отправлена успешно!");
        document.getElementById("callbackForm").reset(); // Очистка формы
        closeCallbackModal(); // Закрытие модального окна
      } else {
        const errorData = await response.json();
        alert(`Ошибка при отправке заявки: ${errorData.error}`);
      }
    } catch (error) {
      alert("Ошибка сети или сервера. Попробуйте позже.");
    }
  });
</script>

  </body>
</html>
