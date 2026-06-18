import myProfilePic from './assets/alberto.jpg'; 

export default function Home() {
    return (
        <>
            <h1 className="page-title">Welcome to my Portfolio</h1>
            <img src={myProfilePic} alt="Alberto" />
            <p className="description">Computing professional nearing the completion of an HNC, with a 20-year background in senior healthcare management.
                I offer a proven track record of leading large teams (up to 50 staff), managing complex operational workflows, and ensuring regulatory compliance in high-stakes, regulated environments.
                I possess a dual-competency in network infrastructure and software development, with proficiency in C++, JavaScript, and modern MVC architecture. I am eager to apply my technical foundation, problem-solving discipline, and leadership experience to dynamic development or infrastructure-focused roles.</p>

        </>)
}get