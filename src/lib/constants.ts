
import { Post, Competition, HallOfFameEntry, JuryNote, CompetitionType } from './types';

export const MOCK_POSTS: Post[] = [
  {
    id: '1',
    title: 'The Silicon Cave: High-Dimensional Shadows',
    author: 'Dr. Elena Vance',
    category: 'Long Essay',
    excerpt: 'A rigorous structuralist analysis of neural latent spaces through the lens of Platonic idealism.',
    date: 'Oct 24, 2024',
    year: '2024',
    readTime: '22 min',
    wordCount: '5,400',
    imageUrl: 'https://images.unsplash.com/photo-1614850715649-1d0106293bd1?q=80&w=2070&auto=format&fit=crop&grayscale=1',
    abstract: 'This inquiry investigates the intersection of classical epistemology and contemporary machine learning. We posit that the latent space of generative models constitutes a modern reconstruction of the Platonic cave, where tokens serve as shadows of a deeper semantic reality.',
    sections: [
      {
        title: 'I. The Architecture of Representation',
        content: 'Representation is inherently a process of loss. When we translate thought into language, we sacrifice the infinite nuances of the pre-linguistic concept for the discrete symbols of the signifier. In the realm of artificial intelligence, this loss is systematized through the process of embedding—the mapping of semantic value into high-dimensional geometric coordinates.'
      },
      {
        title: 'II. The Geometry of the Idea',
        content: 'If meaning can be mapped to geometry, then truth becomes a matter of topology. Plato argued for the existence of Forms—immutable, perfect archetypes. In our digital paradigm, these "Forms" are the latent variables that govern the distribution of generated outputs.'
      },
      {
        title: 'III. Epistemic Authority in the Simulacrum',
        content: 'The danger of the digital cave is not that the shadows are false, but that they are statistically perfect. When the generated shadow is indistinguishable from the object that cast it, the very notion of "origin" dissolves.'
      }
    ],
    footnotes: [
      'Plato, *The Republic*, Book VII, 514a–520a.',
      'Baudrillard, J., *Simulacra and Simulation*, 1981.',
      'Vance, E., "The Latent Ideal", *Journal of Digital Dialectics*, 2023.'
    ],
    editorialCommentary: 'Vance’s synthesis of classical Greek thought and neural architecture remains one of the most significant contributions to our archive.'
  },
  {
    id: '2',
    title: 'The Stoic Virtue of Digital Silence',
    author: 'Marcus J. Aris',
    category: 'Article',
    excerpt: 'Finding quietude in a world designed to amplify the loudest voices.',
    date: 'Oct 22, 2024',
    year: '2024',
    readTime: '8 min',
    wordCount: '1,800',
    imageUrl: 'https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1974&auto=format&fit=crop&grayscale=1',
    openingThesis: 'The modern digital environment is a deliberate engine of propatheiai—pre-emotions designed to bypass the rational faculty and trigger immediate assent.',
    coreArgument: 'True Stoic ataraxia is not found in the rejection of technology, but in the rigorous management of one’s inner citadel against its impressions. Every notification is a stimulus demanding attention; the philosopher’s task is to insert a gap of reason between the signal and the response.',
    tension: 'Critics argue that complete digital withdrawal is a form of civic cowardice. However, we contend that one cannot contribute effectively to the polis if their own rational faculty is in a state of perpetual agitation.',
    closingReflection: 'By reclaiming the "void" in our attention, we do not empty the mind; we prepare the soil for deliberate action.',
    relatedInquiries: [
      'Epictetus on the Management of Impressions',
      'The Architecture of the Inner Citadel',
      'Asynchronous Communication as a Moral Imperative'
    ]
  },
  {
    id: '3',
    title: 'The Dialogue of the Unmoving',
    author: 'S. Beckett (Attributed)',
    category: 'Short Story',
    excerpt: 'An absurdistic exploration of static existence.',
    date: 'Oct 20, 2024',
    year: '2024',
    readTime: '12 min',
    wordCount: '1,200',
    imageUrl: 'https://images.unsplash.com/photo-1518331647614-7a1f04cd34cf?q=80&w=2069&auto=format&fit=crop&grayscale=1',
    formatNote: 'Experimental Philosophical Fiction / Static Dialectic',
    storyBody: 'Two stones sat on a hill. They had sat there for a very long time. \n\n"The wind is louder today," the smaller stone thought. It didn\'t have a mouth, so the thought simply vibrated within its granite core. \n\n"Noise is the vanity of the moving," the larger stone replied, silently. \n\nA lizard paused on the smaller stone. To the stone, the lizard was a fleeting dream of weight. A temporary interruption of the infinite pressure of the sky.',
    postStoryReflection: 'Is the fear of stagnation merely the fear of being truly understood? If movement is an escape from the self, does absolute stasis represent the ultimate encounter with existence?',
    contextNote: 'Written as a tribute to the existentialist tradition, exploring the boundary between being and nothingness.'
  },
  {
    id: '4',
    title: 'The Fractal Moralist: Iterative Ethics',
    author: 'Prof. Julian Thorne',
    category: 'Long Essay',
    excerpt: 'Applying chaos theory and fractal geometry to the formation of normative ethical systems.',
    date: 'Sept 12, 2024',
    year: '2024',
    readTime: '28 min',
    wordCount: '6,200',
    abstract: 'This paper proposes a recursive model of ethics where local actions, governed by simple moral heuristics, aggregate into complex global ethical structures. We investigate whether a "universal moral constant" can be derived from the iterative nature of social contract theory.',
    sections: [
      {
        title: 'I. The Scalability of Intent',
        content: 'Traditional ethics often fails at scale. What is moral for the individual may be catastrophic for the collective. We argue that intent is not a scalar value but a vector that must maintain its direction across all scales of resolution.'
      },
      {
        title: 'II. Bifurcation Points in Decision Theory',
        content: 'Every moral choice acts as a bifurcation point. A minor deviation in initial conditions—a small lie, a moment of greed—can cascade into systemic ethical failure. We map these points using high-resolution behavioral data.'
      }
    ],
    footnotes: [
      'Mandelbrot, B., *The Fractal Geometry of Nature*, 1982.',
      'Rawls, J., *A Theory of Justice*, 1971.',
      'Thorne, J., "The Recursive Contract", *Ethical Topology Quarterly*, 2021.'
    ],
    editorialCommentary: 'Thorne provides a mathematically rigorous defense of universalist ethics in an era of increasing moral relativism.'
  },
  {
    id: '5',
    title: 'Aesthetics as First Philosophy',
    author: 'Clara Monte',
    category: 'Article',
    excerpt: 'Reversing the traditional hierarchy: why Beauty is the prerequisite for Truth.',
    date: 'Aug 05, 2024',
    year: '2024',
    readTime: '10 min',
    wordCount: '2,100',
    openingThesis: 'Beauty is not a subjective quality of the object, but the primary epistemic signal that a system has reached its most efficient and "true" state.',
    coreArgument: 'We argue that the human attraction to symmetry and proportion is not an evolutionary accident but a refined sensing mechanism for mathematical truth. If an equation is beautiful, it is likely true. If a life is beautiful, it is likely ethical. Aesthetics is the sensory experience of logic.',
    tension: 'This view risks justifying "beautiful" atrocities. We must distinguish between the superficial beauty of the mask and the structural beauty of the organism.',
    closingReflection: 'To seek truth, one must first learn to see.',
    relatedInquiries: [
      'The Golden Ratio in Ethical Proportion',
      'Burke on the Sublime as Cognitive Overload',
      'Kant\'s Third Critique: A Modern Re-reading'
    ]
  },
  {
    id: '6',
    title: "The Clockmaker's Remorse",
    author: 'Elias Grey',
    category: 'Short Story',
    excerpt: 'A tale of creation and the terrifying silence of the deist god.',
    date: 'July 15, 2024',
    year: '2024',
    readTime: '15 min',
    wordCount: '1,450',
    formatNote: 'Metaphysical Fiction / Deist Allegory',
    storyBody: 'He built the machine to be perfect. Every gear was polished, every spring tensioned to the exact micro-newton. When he turned the key, the universe began its long, elegant click toward entropy. \n\n"Why don\'t you speak?" the tiny figures inside asked. They looked at the giant brass wheels above their heads and saw only a cold, mechanical necessity. \n\nThe Clockmaker watched from behind the glass. He wanted to reach in, to adjust a pivot, to comfort a crying figure. But to do so would break the very perfection he had created. Intervention is the confession of a flaw.',
    postStoryReflection: 'Is a perfect system necessarily a cruel one? If divine love requires intervention, and perfection forbids it, is God trapped by His own excellence?',
    contextNote: 'An exploration of the 18th-century "Great Watchmaker" argument and its emotional implications for the human condition.'
  },
  {
    id: '7',
    title: 'The Ontology of the Interface',
    author: 'Dr. Sarah K. Miller',
    category: 'Long Essay',
    excerpt: 'An ontological investigation into the nature of the "screen" as a mediating boundary between being and data.',
    date: 'June 22, 2024',
    year: '2024',
    readTime: '25 min',
    wordCount: '5,800',
    abstract: 'This essay examines the phenomenon of the digital interface not as a tool, but as a site of ontological transformation. We argue that the interface serves as a new kind of "membrane" that reconfigures the boundaries of the human subject.',
    sections: [
      {
        title: 'I. The Screen as a Threshold',
        content: 'The screen is no longer a window; it is a surface of engagement. Unlike the traditional window, which maintains a distance between the observer and the observed, the digital screen demands participation. It is a threshold where the subject is translated into data and data is translated into experience.'
      },
      {
        title: 'II. The Architecture of Virtual Presence',
        content: 'Virtual presence is not an absence of physical presence but a different mode of being. We exist in the interface as a series of interactions, a "trace" of our intentions mapped onto the pixelated surface of the world.'
      }
    ],
    footnotes: [
      'Heidegger, M., *The Question Concerning Technology*, 1954.',
      'Flusser, V., *Into the Universe of Technical Images*, 1985.',
      'Miller, S.K., "The Pixelated Being", *Phenomenology of Media*, 2022.'
    ],
    editorialCommentary: 'Miller’s work is a vital contribution to our understanding of the lived experience in the age of ubiquitous screens.'
  },
  {
    id: '8',
    title: 'Digital Asceticism: A New Way of Being',
    author: 'Brother Thomas',
    category: 'Article',
    excerpt: 'Why intentional disconnection is the ultimate act of modern rebellion.',
    date: 'May 10, 2024',
    year: '2024',
    readTime: '12 min',
    wordCount: '2,400',
    openingThesis: 'The constant stream of digital information is a form of sensory gluttony that prevents the soul from achieving true stillness.',
    coreArgument: 'True asceticism in the modern age does not require a hair shirt or a cave; it requires a deliberate and sustained "no" to the algorithmic push for our attention. By limiting our digital intake, we create the necessary space for deep thought and genuine connection with the world as it is, not as it is presented to us.',
    tension: 'Is complete disconnection even possible in a world where our very survival often depends on digital systems? We argue for a "moderate asceticism"—a middle way of intentional and limited engagement.',
    closingReflection: 'Silence is the currency of the free mind.',
    relatedInquiries: [
      'The Desert Fathers and the Silence of the Heart',
      'The Ethics of Attention in a High-Frequency World',
      'Minimalism as a Moral Imperative'
    ]
  },
  {
    id: '9',
    title: 'The Librarian of Babel.js',
    author: 'Jorge L. B.',
    category: 'Short Story',
    excerpt: 'A modern reimagining of the infinite library as a vast, ever-changing codebase.',
    date: 'April 02, 2024',
    year: '2024',
    readTime: '18 min',
    wordCount: '2,000',
    formatNote: 'Cyber-Borgesian Allegory',
    storyBody: 'The Librarian had spent cycles searching for the "Genesis Commit"—the original line of code that had given birth to the infinite, self-replicating library of Babel.js. The library was composed of every possible sequence of characters, every possible function, and every possible error. \n\n"The library is not just a collection of scripts," the Librarian thought as he traversed the recursive directories. "It is the universe itself, written in a language that no one fully understands." \n\nHe found a file named `void.js`. It was empty. "This," he realized with a start, "is the only true knowledge we have." In the silence of the empty file, he finally understood the infinite noise around him.',
    postStoryReflection: 'Does the infinite availability of information lead to a total loss of meaning? If everything is written, does anything actually matter?',
    contextNote: 'A tribute to the work of Jorge Luis Borges, exploring the intersection of literature and computer science.'
  }
];

export const COMPETITION_TYPES: CompetitionType[] = [
  {
    id: 'T1',
    title: 'The Logos Prize',
    frequency: 'Annual (October)',
    description: 'The premier distinction for formal philosophical research.',
    requirements: '4,000–7,000 words. Must contain original dialectic advancement and formal citations.'
  },
  {
    id: 'T2',
    title: 'The Quarterly Inquiry',
    frequency: 'Every 3 Months',
    description: 'A focused call for contemporary reflections on specific ethical dilemmas.',
    requirements: '1,500–2,500 words. Priority given to clarity and immediate societal relevance.'
  },
  {
    id: 'T3',
    title: 'The Monthly Dialogue',
    frequency: 'Monthly',
    description: 'Experimental philosophical fiction and brief thought experiments.',
    requirements: '500–1,200 words. Focus on narrative strength and conceptual provocation.'
  }
];

export const CURRENT_COMPETITION: Competition = {
  title: 'The Logos Prize 2024',
  deadline: 'Nov 30th',
  prize: '$1,500 + Publication',
  description: 'Submit an original essay on "The Ethics of Artificial Agency: Responsibility in Automated Systems".'
};

export const DETAILED_HALL_OF_FAME: HallOfFameEntry[] = [
  {
    id: 'hof-1',
    name: 'Dr. Julian Thorne',
    award: 'Annual Excellence',
    year: 2023,
    points: 980,
    category: 'Dialectics',
    highlightEntry: {
      title: 'The Architecture of Absence',
      excerpt: 'A foundational look at what we do not say as the primary carrier of meaning in structuralist thought.',
      editorialNote: 'Thorne demonstrates a rare surgical precision in dismantling linguistic assumptions.'
    }
  },
  {
    id: 'hof-2',
    name: 'Sarah Wu',
    award: 'Logos Prize Winner',
    year: 2023,
    month: 'September',
    points: 945,
    category: 'Ethics',
    highlightEntry: {
      title: 'Virtue in the Machine',
      excerpt: 'Reconciling Aristotelian ethics with algorithmic decision-making frameworks.',
      editorialNote: 'Wu manages to bridge 2,500 years of distance with effortless clarity.'
    }
  },
  {
    id: 'hof-3',
    name: 'Karthik Raja',
    award: 'Best Short Fiction',
    year: 2022,
    points: 910,
    category: 'Existentialism'
  }
];

export const JURY_NOTES: JuryNote[] = [
  {
    curator: 'Prof. Elias Sterling',
    note: 'The selection for the Hall of Fame is not merely an act of recognition, but an assertion of structural integrity. We look for the "Internal Logic" that survives the passage of time.'
  }
];

export const HALL_OF_FAME = DETAILED_HALL_OF_FAME.slice(0, 3).map(e => ({ name: e.name, award: e.award + ' ' + e.year }));
