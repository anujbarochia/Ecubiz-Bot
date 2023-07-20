const { Telegraf } = require("telegraf");
const axios = require("axios");
require("dotenv").config();
const cheerio = require("cheerio");

const bot = new Telegraf(process.env.BOT_TOKEN);
const AboutCompany =
  "*Ecubiz* is a technology company committed to delivering innovative solutions while upholding high ethical standards and core values\\. Our aim is to create a healthy work environment that values equal treatment for all stakeholders, including employers, employees, and clients\\. At Ecubiz, our success is not solely determined by profit margins\\. We believe that true success lies in fostering a positive work culture and maintaining strong ethical principles\\. Our core values of integrity, transparency, and collaboration guide our daily operations\\.";

// let $ = cheerio.load();
// let $items = $('[class="elementor-image-box-title"]').text();
bot.start((ctx) =>
  ctx.replyWithMarkdownV2(`Welcome to *Ecubiz* company's bot, How can I help you
  
*Our Realm*
/website:  Explore our digital realm\\!

*Get Connected*
/appointment:  Secure your spot in our virtual queue
/careers:  Join the geek squad now\\!
/blog:  Wisdom in bite\\-sized pieces
/services:  Geekify your business operation
/about:  Decrypt our company's secret
/contact\\_us:  Connect with the tech wizards

*Mail*
/email: Ping us in cyberspace
/hr\\_email: Contact Human Resources

*Team*
/CTO: The tech guru
/CEO: The mastermind

/help: List of all commands
/core\\_values: Our principles day in \\- day out
  `)
);
bot.command("core_values", async (ctx) => {
  const response = await axios.get("https://ecubiz.com/about/");
  let $ = cheerio.load(response.data);
  const elements = $(".elementor-image-box-title").map((_, element) =>
    $(element).text().trim()
  );

  // Output the extracted text, one line at a time
  elements.each((_, element) => {
    ctx.reply(element);
  });
  // const rep = Array.from($items).map(($el) => {
  //   return $el.text();
  // });
  // ctx.reply(rep);

  // for (const iterator of $items) {
  // ctx.reply($items);
  // }
});
bot.command("email", (ctx) =>
  ctx.replyWithMarkdownV2("Our address via *SMTP* hello@ecubiz\\.com")
);
bot.command("hr_email", (ctx) =>
  ctx.replyWithMarkdownV2("Contact Human Resource: hr@ecubiz\\.com")
);

bot.command("website", (ctx) =>
  ctx.replyWithMarkdownV2("Explore our *Realm* at https://ecubiz\\.com/")
);
bot.command("appointment", (ctx) =>
  ctx.replyWithMarkdownV2(
    "Book your *Appointment* here: https://ecubiz\\.com/book\\-appointment/"
  )
);
bot.command("blog", (ctx) =>
  ctx.replyWithMarkdownV2(
    "Our *valuable* insights for free: https://ecubiz\\.com/blog/"
  )
);
bot.command("careers", (ctx) =>
  ctx.replyWithMarkdownV2("Join the *Squad*: https://ecubiz\\.com/careers/")
);
bot.command("services", (ctx) =>
  ctx.replyWithMarkdownV2(
    "Your *Problems* ends here: https://ecubiz\\.com/services/"
  )
);
bot.command("about", (ctx) =>
  ctx.replyWithMarkdownV2(`
  ${AboutCompany}\n\nFind our *Story* here: https://ecubiz\\.com/about/`)
);
bot.command("contact_us", (ctx) =>
  ctx.replyWithMarkdownV2(
    "You can find our *Tech Wizards* at https://ecubiz\\.com/contact/"
  )
);
bot.command("CEO", (ctx) =>
  ctx.replyWithMarkdownV2(
    `*Parin*, an experienced software developer, started Ecubiz with a mission to create advanced solutions for business growth\\. With a strong belief in technology's positive impact, he aims to exceed client expectations and stay ahead in the industry\\.\n\nBrings years of experience and a passion for innovation to *Ecubiz*\\. Expect exceptional results that surpass expectations from an industry\\-leading company\\.\n\n*Mastermind's* Address: \nhttps://www\\.linkedin\\.com/in/parin\\-kansagara/
  `
  )
);
bot.command("CTO", (ctx) =>
  ctx.replyWithMarkdownV2(
    `
    *Dhrumil*, driven by a deep understanding of diverse business challenges, founded *Ecubiz* to deliver high\\-quality solutions\\. As *CTO*, guiding a skilled team to provide cutting\\-edge solutions\\. With a focus on continuous learning and empowering his team, he ensures success in managing complex projects and meeting clients' needs\\.\n\nUnlock your business's full potential with Dhrumil, a dynamic innovator who combines technical brilliance with a passion for excellence, delivering exceptional results every step of the way\\.\n\n*Tech Wizard's* address: \nhttps://www\\.linkedin\\.com/in/dhrumil\\-bhankhar/
    `
  )
);
bot.command("help", (ctx) =>
  ctx.replyWithMarkdownV2(`These are all the commands to know all about *Ecubiz*
  
*Our Realm*
/Website:  Explore our digital realm\\!

*Get Connected*
/Appointment:  Secure your spot in our virtual queue
/Careers:  Join the geek squad now\\!
/Blog:  Wisdom in bite\\-sized pieces
/Services:  Geekify your business operation
/About:  Decrypt our company's secret
/Contact\\_Us:  Connect with the tech wizards

*Mail*
/Email: Ping us in cyberspace
/HRmail: Contact Human Resources

*Team*
/CTO: The tech guru
/CEO: The mastermind
  `)
);

bot.on("sticker", (ctx) => ctx.reply("❤"));

bot.hears(/hello/i, (ctx) => {
  const firstName = ctx.message.from.first_name;
  ctx.reply(
    `Hello ${firstName},\nHope you are having good day\n\n How can i /help you`
  );
});

bot.on("text", (ctx) => {
  const query = ctx.message.text; //users reply

  const reply = `You asked: *${query}*\n\nBut i can't understand it, try using /help for commands or contact at hello@ecubiz\\.com`;

  ctx.replyWithMarkdownV2(reply);
});

bot.launch();
