import MusicCard from './MusicCard';

export default function Music() {
    const myMusic = [
        {
            title: "Symphony no.1 in G",
            description: "For Symphony Orchestra",
            urls: [
                { movement: "1st Movement", link: "https://www.youtube.com/watch?v=AV1RopJcOXU" },
                { movement: "2nd Movement", link: "https://www.youtube.com/watch?v=A06iaZWEwOc" },
                { movement: "3rd Movement", link: "https://www.youtube.com/watch?v=usrafdQmZ40" },
                { movement: "4th Movement", link: "https://www.youtube.com/watch?v=MG_ygffFMMA" },

            ]

        },
        {
            title: "Symphony no.2 in F-Sharp",
            description: "For Symphony Orchestra",
            urls: [
                { movement: "1st Movement", link: "https://www.youtube.com/watch?v=AfPZya975xA" },
                { movement: "2nd Movement", link: "https://www.youtube.com/watch?v=p8R2u3_2cTg" },
                { movement: "3rd Movement", link: "https://www.youtube.com/watch?v=5VLJyxNu3E4" },
                { movement: "4th Movement", link: "https://www.youtube.com/watch?v=43KL1-2RNEk" },

            ]

        },
        {
            title: "Symphony no.3 in B-Flat",
            description: "For Symphony Orchestra",
            urls: [
                { movement: "1st Movement", link: "https://www.youtube.com/watch?v=gO-QpFzisVo" },
                { movement: "2nd Movement", link: "https://www.youtube.com/watch?v=FyRpD-jCmBk" },
                { movement: "3rd Movement", link: "https://www.youtube.com/watch?v=jbmgY_dARbQ" },
                { movement: "4th Movement", link: "https://www.youtube.com/watch?v=owlqvG5hYyo" },

            ]

        },
        {
            title: "Concerto in E-Flat for Horn",
            description: "For Horn and Orchestra - the 2nd Movement also arranged for Woodwind quintet and Piano",
            urls: [
                { movement: "1st Movement", link: "https://www.youtube.com/watch?v=aGoJ-wrOk6g" },
                { movement: "2nd Movement", link: "https://www.youtube.com/watch?v=SQQK23CsCq4" },
                { movement: "2nd Movement/for Horn, woodwind quartet and piano", link: "https://www.youtube.com/watch?v=LEkjFikLUv0" },
                { movement: "3rd Movement", link: "https://www.youtube.com/watch?v=jbmgY_dARbQ" },


            ]

        },



    ];


    return (
        <>
            <h1 className="page-title">Music</h1>
            <div className="portfolio-grid-list">
                <div>

                    {myMusic.map((music, index) => (
                        <MusicCard key={index} music={music} />
                    ))}

                </div>
            </div>

        </>
    )
}