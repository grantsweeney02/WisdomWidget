const OpenAI = require("openai")

async function summarize(html) {
	const openai = new OpenAI({ apiKey: "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" })

	const completion = await openai.chat.completions.create({
		messages: [
			{
				role: "system",
				content: `
				Tell me the title of this article from the body of the HTML. Summarize the article and give me some detailed key points for studying.

				Output your message in the following JSON format:
				
				{
				  title: "",
				  summary: "",
				  key-points: [
					point: "",
					point: "",
					...
				  ]
				}`,
			},
			{
				role: "user",
				content: html,
			},
		],
		model: "gpt-3.5-turbo",
	})

	let message = completion.choices[0].message.content
	const startIdx = message.indexOf("{")
	const endIdx = message.lastIndexOf("}")
	message = message.slice(startIdx, endIdx + 1)
	messageJSON = await JSON.parse(message)
	return messageJSON
}

const test = async () => {
	testreturn = await summarize(
		`
<!doctype html>
<!--[if lt IE 7 ]><html lang="en" class="no-js ie6"> <![endif]-->
<!--[if IE 7 ]><html lang="en" class="no-js ie7"> <![endif]-->
<!--[if IE 8 ]><html lang="en" class="no-js ie8"> <![endif]-->
<!--[if IE 9 ]><html lang="en" class="no-js ie9"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!-->
<html lang="en" class="no-js"> <!--<![endif]-->
<head>
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-D2WHK5N4F7"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-D2WHK5N4F7');
    </script>
	<script type="text/javascript">var _sf_startpt = (new Date()).getTime()</script>
	<meta charset="utf-8">
	<!--[if IE]><meta content='IE=8' http-equiv='X-UA-Compatible' /><![endif]-->

	<title>SDE | Scale</title>
  <meta name="description" content="A course for teaching students how to build larger, more complicated software systems collaboratively, including end-to-end development.">
  <meta name="author" content="sde-coursepack">

  <meta property="og:title" content="SDE" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://sde-coursepack.github.io" />

  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

	<link rel="shortcut icon" href="/img/favicon.ico">

	<link rel="stylesheet" href="/css/p2pustrap-custom.css" />
	<link rel="stylesheet" href="/css/site.css" />
  

	<link rel="shortcut icon" href="/img/favicon.ico">
	<script type="text/javascript" src="/js/modernizr-2.6.2.min.js"></script>
</head>
<body 
      class="d-flex flex-column min-vh-100">

<!-- Navigation -->
<nav class="navbar navbar-expand-md py-0 .navbar-dark bg-dark text-light">
  <a class="navbar-brand" href="/"><i class="fa fa-home"></i></a>

  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <i class="fa fa-bars"></i>
  </button>

  <div class="navbar-collapse collapse" id="navbarSupportedContent">
    <ul class="navbar-nav">
      
       
       <li class="nav-item py-2 active">
         <a class="nav-link" href="/modules/intro/scale/">
           intro
         </a>
       </li>
      
       
       <li class="nav-item py-2">
         <a class="nav-link" href="/modules/java/Why-Java/">
           java
         </a>
       </li>
      
       
       <li class="nav-item py-2">
         <a class="nav-link" href="/modules/objects/Classes/">
           objects
         </a>
       </li>
      
       
       <li class="nav-item py-2">
         <a class="nav-link" href="/modules/construction/Version-Control/">
           construction
         </a>
       </li>
      
       
       <li class="nav-item py-2">
         <a class="nav-link" href="/modules/testing/V-and-V/">
           testing
         </a>
       </li>
      
       
       <li class="nav-item py-2">
         <a class="nav-link" href="/modules/refactoring/Analyzability/">
           refactoring
         </a>
       </li>
      
       
       <li class="nav-item py-2">
         <a class="nav-link" href="/modules/design/Design/">
           design
         </a>
       </li>
      
       
       <li class="nav-item py-2">
         <a class="nav-link" href="/modules/patterns/Design-Patterns/">
           patterns
         </a>
       </li>
      
       
       <li class="nav-item py-2">
         <a class="nav-link" href="/modules/gui/GUI/">
           gui
         </a>
       </li>
      
       
       <li class="nav-item py-2">
         <a class="nav-link" href="/modules/data/Data-Persistence/">
           data
         </a>
       </li>
      
       
       <li class="nav-item py-2">
         <a class="nav-link" href="/modules/about/about/">
           about
         </a>
       </li>
      
<!--
      <li class="nav-item py-2">
        <a class="nav-link" href="https://www.p2pu.org/en/" target="_blank">Example Link</a>
      </li>
-->
    </ul>
  </div>
</nav>



<div class="container-fluid d-flex flex-grow-1 flex-column">
  <div class="row flex-grow-1">
		<div class="sidebar col-md-3">
	







	
	<ul>
		
			<li class="active first ">
				<a
						href="/modules/intro/scale/">
					Scale
				</a>
			</li>
		
			<li class="  ">
				<a
						href="/modules/intro/failures/">
					Failures
				</a>
			</li>
		
			<li class="  ">
				<a
						href="/modules/intro/complexity/">
					Complexity
				</a>
			</li>
		
			<li class="  ">
				<a
						href="/modules/intro/Improving/">
					Improving
				</a>
			</li>
		
			<li class="  ">
				<a
						href="/modules/intro/Software-Quality/">
					Software Quality
				</a>
			</li>
		
			<li class="  ">
				<a
						href="/modules/intro/External-Quality/">
					External Quality
				</a>
			</li>
		
			<li class="  last">
				<a
						href="/modules/intro/Internal-Quality/">
					Internal Quality
				</a>
			</li>
		
	</ul>
	
		<hr />
		<div class="pagination-section">
			<div class="title">
				Next module:
			</div>
			<a rel="next" class="next" href="/modules/java/Why-Java/"> java
			</a>
		</div>
	
</div>

		<div class="col-xl-6 col-md-9 bg-white">
			<div class="content p-md-2">
				<h1 class="no_toc" id="scaling-up-software">Scaling up Software</h1>

<blockquote>
  <p>“Don’t believe anything you read on the net. Except this. Well, including this, I suppose.” <br />
–Douglas Adams</p>
</blockquote>

<p>In this module, we’ll discuss the reality of long-term, larger-scale software. We’ll examine how real-world software, which must release, meet the ever-changing needs of customers, and evolve and adapt over time, differs from software written in introductory programming classes. Finally, we’ll address how this forces us to change our approach when building software.</p>

<hr />

<h2 class="no_toc" id="contents">Contents</h2>

<ul id="markdown-toc">
  <li><a href="#writing-code-vs-solving-problems" id="markdown-toc-writing-code-vs-solving-problems">Writing Code vs Solving Problems</a></li>
  <li><a href="#large-scale-systems" id="markdown-toc-large-scale-systems">Large scale systems</a></li>
  <li><a href="#ad-hoc-solutions" id="markdown-toc-ad-hoc-solutions">Ad hoc solutions</a></li>
  <li><a href="#increasing-problem-scale" id="markdown-toc-increasing-problem-scale">Increasing problem scale</a></li>
  <li><a href="#goals-of-this-course" id="markdown-toc-goals-of-this-course">Goals of this course</a></li>
</ul>

<hr />

<h2 id="writing-code-vs-solving-problems">Writing Code vs Solving Problems</h2>

<p>If you’re taking this course at the University of Virginia, you’ve likely been learning how to write code for a year or more. This means you are capable of writing simple scripts, and even small multi-class programs, especially in Java. Even if you aren’t at the University of Virginia and found this or had this website used by your instructor, you should still have some of these skills. These valuable skills are the bedrock on which to grow your skills.</p>

<p>However, the skill by itself is just one set of tools. A master craftsperson must know how to use all kinds of tools, and must constantly learn the usage of new tools. But knowing how to use a single set of tools in specific, well-defined situations, doesn’t make one a master. Being a master of one’s craft comes from the ability to combine these tools to create great works. It comes from being able to determine which tool is best for a specific job, and the creativity to design and plan your great works. A master craftsperson works efficiently and accurately, yes, but they also produces work that they take pride in.</p>

<p>In this class, I want to do more than code. I want to you to become a craftsperson, one who builds high quality work that will last; <strong>work that you can be proud of</strong>. You won’t attain mastery in one semester, nor will you become a great craftsperson during a 4-year college education in computer science. That will take decades of work, experience, failures, successes, and continued learning. But the goal of this course is to give you enough tools, techniques, and goals to start you on your journey.</p>

<hr />

<h2 id="large-scale-systems">Large scale systems</h2>

<blockquote>
  <p>“‘Space,’ it says, ‘is big. Really big. You just won’t believe how vastly, hugely, mindbogglingly big it is. I mean, you may think it’s a long way down the road to the chemist’s, but that’s just peanuts to space.’”<br />
–<strong>Hitchhiker’s Guide to that Galaxy</strong>, Douglas Adams</p>
</blockquote>

<p>Your classroom experience in coding so far likely has not prepared you for writing <em>enterprise</em> systems. The word enterprise means “a project or undertaking, typically one that is difficult or requires effort.” When we talk about <em>enterprise software</em>, we are talking about larger software systems. These systems are built and maintained by teams of programmers over a long period of time, and must respond to changing customer needs or environmental changes.</p>

<p>(A quick note that in the software community “enterprise” sometimes gets used a pejorative for older software or over-designed software. Such software does exist, and it has a well-earned reputation for becoming unwieldy and resistant to change. My key point in the previous paragraph is that commercial software systems are simply far larger than anything that can be feasibly built in an academic setting).</p>

<p>Unfortunately, software problems can’t be solved by just adding more people. Famously, <a href="https://en.wikipedia.org/wiki/Brooks%27s_law">Brook’s Law</a> states that “adding manpower to a late software project makes it later.” Fred Brooks, the namesake of the law, notes that it takes time for even skilled programmers to become productive in a software system. That “ramp-up” time likely means an experienced programmer in the software system is spending their time on training their inexperienced colleagues. This is time the experienced programmer otherwise could have spent implementing features, refactoring code to improve understandability, etc.</p>

<p>Communication overhead is also a serious consideration; as the size of a team increases, the number of lines of communication increase quadratically. For instance, a team of 5 people only has 10 lines of communication, whereas a team of 10 people as 45 lines of communication! Simply doubling the size of the team <strong>more than quadruples</strong> the lines of communication. Remember, increasing quadratically is why we don’t bother with selection and insertion sort in most cases, because the growth rate is so bad.</p>

<p><strong>This problem isn’t unique to software!</strong> Engineers of all stripes have to deal with novel problems emerging as the size of a project increases!</p>

<hr />

<h2 id="ad-hoc-solutions">Ad hoc solutions</h2>

<p>Imagine a scenario: You are hiking with several small children. You come across a small creek in your path. You need to get children over the creek without their feet getting wet. What do you do?</p>

<p><img src="https://www.bassettcreekwmo.org/application/files/1514/5676/5130/PlymouthCreek-BassettCreekWatershed.jpg" width="40%" alt="A picture of Bassett Creek in Plymouth, Minnesota, via Bassett Creek Watershed" /></p>

<p>Well, thinking quickly, you may see a log nearby, drag it over, and lay it across the creek, having kids walk over. After the kids are over, you may leave the log and walk away, never thinking of crossing that creek again.</p>

<p>This is an <em>ad hoc</em> solution: that is, a one-time solution to the problem. You had a short-term need, so you made a quick and easy solution to solve your immediate problem. You don’t care about maintaining the solution, you don’t care about other people being able to use the solution, you don’t have a long term plan in place if the log rots, etc.</p>

<p>The thing is, most engineering problems aren’t solved this way. But this is likely how you’ve been doing most homework so far! You build one assignment at a time, sometimes the day before it is due, you keep writing code until it works, and then as soon as it works you submit it and move on to something else. You may never even look at that code again! Obviously consumer software doesn’t work this way.</p>

<hr />

<h2 id="increasing-problem-scale">Increasing problem scale</h2>

<p>Now imagine that instead of a small creek, you are crossing a large river. Instead of small children, you are transporting cars. And instead of crossing the river once, you need these cars to be able to go back and forth across this bridge for several decades. This means not just building the bridge, but establishing the process of <em>how</em> you are going to build the bridge, what is the budget of this bridge, how is this bridge going to be maintained, how are you going to monitor this bridge for faults, how will you ensure the bridge doesn’t fail when a heavy truck drives over, how will you ensure the bridge meets federal and local regulations, etc.</p>

<p>“Dragging over an even bigger log” isn’t a solution.</p>

<p>The key takeaway is that small scale ad hoc problem-solving is <strong>fundamentally different</strong> from building larger, sustainable, systematic solutions to problems. Building one-off throw away assignments in earlier programming classes does not teach you the critical skills needed for industry, where you will build software that needs to meet complex and diverse requirements <em>and</em> must be maintained for years or even decades after launch.</p>

<p>Large-scale software isn’t built by one programmer working alone for one afternoon, or cramming at midnight before the due date, testing their code against a teacher provider auto-grader. In industrial software, long-term projects built incrementally one step at a time over months or years, and maintained long after release, <strong>are the norm</strong>.</p>

<hr />

<h2 id="goals-of-this-course">Goals of this course</h2>

<p>In this course, we will start preparing you for writing and evolving larger software systems. You will practice incremental development techniques alongside other programmers, building more complex software than you have worked with previously.</p>

<p>In your future classes, you can expect to use these skills! You will have to be ready to answer several questions that will come up during your project (I include the module group most related to that question)!</p>
<ul>
  <li>“How are we going to share code and break up work?” - (Collaboration)</li>
  <li>“How will we know if we’re on the right track?” - (Testing)</li>
  <li>“How can we avoid our code becoming an incomprehensible, entangled mess?” - (Refactoring)</li>
  <li>“How can be we ensure our software will be receptive to change?” - (Design)</li>
  <li>“What are some established techniques we can use to ensure maintainability?” - Patterns</li>
  <li>“How will our users interact with our software?” - GUI</li>
  <li>“Where is our data coming from, and where is it going?” - Data</li>
</ul>

<p>While this course teaches a grab-bag of different skills, these were not selected at random. At the end of this course, you should be ready to jump in to a larger project, and be able to build the system incrementally over time with your project teammates.</p>

<blockquote>
  <p>“I’d take the awe of understanding over the awe of ignorance any day.”<br />
–<strong>The Salmon of Doubt</strong>, Douglas Adams</p>
</blockquote>

				





				<hr />
        <div class="row">
					<div class="pagination-section col-sm-6">
				
					</div>
				
					<div class="pagination-section text-sm-right col-sm-6">
						<div class="title">
							Next submodule:
						</div>
						<a rel="next" class="next" href="/modules/intro/failures/"> Failures
						</a>
					</div>
				
        </div>
			</div>
		</div>
  </div>
</div>


<footer class="mt-auto">
  <div class="container-fluid">
  <p>Copyright Paul "Will" McBurney 2022-2023 unless otherwise noted.</p>
  <p>Built using <a href="https://course-in-a-box.p2pu.org">Course in a Box</a>, a project of <a href="https://www.p2pu.org">P2PU</a>.</p>

  <p>Unless otherwise noted, all the materials on this site are licensed under a <a target="_blank" href="http://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0 license</a>.</p>
  </div>
</footer>



<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script>
<script src="/js/init.js"></script>
<script src="/js/gh_link_helper.js"></script>



<script>
	P2PU.ciab.init();
</script>

<!-- Google Analytics -->

	<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  
    ga('create', 'G-D2WHK5N4F7', 'auto');
  
  
    ga('create', 'UA-55722824-1', 'auto', {'name': 'p2puTracker'} );
  
  
    ga('send', 'pageview');
  
  
    ga('p2puTracker.send', 'pageview');
  
</script>



</body>
</html>

`
	)
    console.log(testreturn)
}

test()