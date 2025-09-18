# Far North Youth Development Initiative (FNYDI) Website

This is the official website for the Far North Youth Development Initiative (FNYDI), a registered non-profit organization dedicated to empowering youth through education, creativity, and community-based programs in Limpopo, South Africa.

## Mission

FNYDI's mission is to bridge the digital divide by fostering a tech-savvy, self-sufficient society through youth-centered learning and skills development. The organization envisions a future where every young person in the region has access to quality education, tools for innovation, and platforms for creative expression.

## Getting Started

This is a static HTML, CSS, and JavaScript website. No special build steps are required.

### Prerequisites

You only need a modern web browser to view the website.

### Viewing Locally

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/fnydi-website.git
   ```

2. Navigate to the project directory:

   ```sh
   cd fnydi-website
   ```

3. Open the `index.html` file in your web browser.

## File Structure

The repository is organized as follows:

```text
.
├── assets/
│   ├── images/
│   └── logos/
├── css/
│   ├── netlify-db-styles.css
│   └── styles.css
├── js/
│   └── main.js
├── *.html
├── .env.example
├── CNAME
├── README.md
└── package.json
```

- **`*.html`**: These are the individual pages of the website. All HTML files are commented to explain the structure of the page.
- **`assets/`**: Contains all static assets like images and logos.
- **`css/`**: Contains the stylesheets for the website.
  - `styles.css`: The main stylesheet for the entire website. It includes a design system with CSS variables, base styles, and component styles. The file is commented to explain the different sections.
  - `netlify-db-styles.css`: Styles specifically for the blog posts that are loaded dynamically. This file is also commented.
- **`js/`**: Contains the JavaScript files.
  - `main.js`: This file contains all the interactive logic for the site, including navigation, animations, form handling, and API interactions with Netlify for the blog/news section. All functions and classes in this file are documented with JSDoc comments.
- **`package.json`**: Lists project dependencies (in this case, for development tools like `netlify-cli`).

## Main Programs Overview

- **Digital Skills Development:** Industry-aligned training powered by Cisco Networking Academy, NEMISA, and University of Limpopo. Courses include coding, networking, IT support, and more.
- **Arts & Culture:** Empowering youth through creative arts such as painting, sculpture, community exhibitions, and mentorship programs.
- **EPWP Community Job Creation Projects:** Youth involvement in public service roles including admin support, digital literacy drives, and environmental cleanup campaigns.

## Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature-name`).
6. Open a pull request.

Please ensure that any new JavaScript code is well-documented using JSDoc style.

## Contact Information

- **Email**: <fnydii@gmail.com>
- **Phone**: 083 402 4342 | 072 718 2327
- **Address**: 97 Krogh Street, Makhado 0920
- **Registration Number**: 012-647-NPO

## Credits

This website and its programs are supported by partners including Cisco Networking Academy, NEMISA, and the University of Limpopo.

## License

No license specified.
