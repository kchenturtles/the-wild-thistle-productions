import styles from "./contact.module.css";
import Head from 'next/head';

export const metadata = {
  title: "Contact Us",
};

export default function Contact () {
  return (
    <div>
    <Head>
    <title>Contact | The Wild Thistle Productions</title>
    </Head>
    <main>
      <div className={'h-lvh container max-w-[1200px] mx-auto px-8 sm:px-12 md:px-24 lg:px-36'}>
        <div className="title mt-12 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">Leave A Comment </div>
        <p className = {"hover:cursor-pointer hover:underline link"}> thewildthistleproductions@gmail.com</p>
        <div className={styles.form} >
          <form action="https://api.staticforms.xyz/submit" method="post">
            <input type="hidden" name="accessKey" value="beca0155-06a5-415d-ae44-71b4b1bdff69" />
            <div className={styles.input}> <label htmlFor="name">Name</label>
              <input type="text" name="name" required/></div>
            <div className={styles.input}> <label htmlFor="email">Email Address</label>
              <input type="text" name="email" required/> </div>
            <div className={styles.input}> <label htmlFor="subject">Subject</label>
              <input type="text" name="subject" required/></div>
            <div className={styles.input}> <label htmlFor="message"> Message</label>
              <textarea name="message" required className={styles.longInput}/>
            </div>
            <input type="hidden" name="replyTo" value="@" />
            <input type="text" name="honeypot" style={{ display: "none" }} />
            <div className={styles.input}> <button type="submit" className={`button ${styles.submit}`}>Submit</button></div>
          </form>
        </div>
      </div>
    </main>
    </div>
  );
}
