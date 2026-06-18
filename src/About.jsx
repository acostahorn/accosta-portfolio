export default function About() {
    return (
        <>
            <h1 className="page-title">About</h1>
            <p className="description">I came to Scotland from 2016 and I worked both in Scotland and England first as a nurse, then as a nursing home deputy manager and manager.</p>

            <p className="description"> I always had a strong inclination towards computing - I studied C++ in 2022, but I had already experience with the C language -
                In 2016, I developed a TUI C app I used a tool while a a post-grad nursing student. It applies a model called RUG-III/MDS to predict staffing needs as a function of clinical complexity. It is now little more than an antique but you can find it here:</p>
            <div className="legacy-code-box">
                <a
                    href="/programmarug-0.zip" /* Points directly to your public folder */
                    download="programmarug-0.zip" /* Gives the file a clean name on download */
                    className="btn btn-secondary"
                    style={{ display: 'inline-block', marginTop: '10px' }}>RUG-III Calculator</a>
            </div>
            <p className="description">In 2025, I finally decided to quit nursing and start a new career in Computing. I attended a HNC NextGen Computing with excellent outcomes (I am still waiting for my diploma to be issued).
                While a student, I added extra learning - not included in the course by completing a very long and complex Web Developer bootcamp on Udemy, which allowed me to develop from scratch a fully functioning demo website for a e-shop, which includes an innovative design page an a chat line with a smart chatbot.
                I also learned to develop from scratch C++ application with the Qt framework - I wrote a Subnet Quiz app that would work as an excellent training tool for infrastructure students.
                I proved that I can also engineer code by used AI agents. Using openClaw and two AI models, I developed a "Historical Debate and Chat Engine" that allows you either to have a conversation with a historical character, or to have two of them start a dialogue on a topic of your choice.
            </p>
            <p className="description">I am also an amateur horn player and composer. I wrote a short piece for concert band, that was first performed by the Border Band in Carlisle, three Symphonies and a Concerto for Horn and Orchestra. </p>

        </>)
}