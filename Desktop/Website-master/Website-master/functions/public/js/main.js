 AOS.init({
 	duration: 800,
 	easing: 'slide'
 });

(function($) {

	"use strict";

	$(window).stellar({
    responsive: true,
    parallaxBackgrounds: true,
    parallaxElements: true,
    horizontalScrolling: false,
    hideDistantElements: false,
    scrollProperty: 'scroll'
  });


	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	// loader
	var loader = function() {
		setTimeout(function() { 
			if($('#ftco-loader').length > 0) {
				$('#ftco-loader').removeClass('show');
			}
		}, 1);
	};
	loader();

	// Scrollax
   $.Scrollax();

	var carousel = function() {
		$('.home-slider').owlCarousel({
	    loop:true,
	    autoplay: true,
	    margin:0,
	    animateOut: 'fadeOut',
	    animateIn: 'fadeIn',
	    nav:false,
	    autoplayHoverPause: false,
	    items: 1,
	    navText : ["<span class='ion-md-arrow-back'></span>","<span class='ion-chevron-right'></span>"],
	    responsive:{
	      0:{
	        items:1
	      },
	      600:{
	        items:1
	      },
	      1000:{
	        items:1
	      }
	    }
		});
		$('.carousel-testimony').owlCarousel({
			autoplay: true,
			center: true,
			loop: true,
			items:1,
			margin: 30,
			stagePadding: 0,
			nav: false,
			navText: ['<span class="ion-ios-arrow-back">', '<span class="ion-ios-arrow-forward">'],
			responsive:{
				0:{
					items: 1
				},
				600:{
					items: 1
				},
				1000:{
					items: 2
				}
			}
		});

	};
	carousel();

	$('nav .dropdown').hover(function(){
		var $this = $(this);
		// 	 timer;
		// clearTimeout(timer);
		$this.addClass('show');
		$this.find('> a').attr('aria-expanded', true);
		// $this.find('.dropdown-menu').addClass('animated-fast fadeInUp show');
		$this.find('.dropdown-menu').addClass('show');
	}, function(){
		var $this = $(this);
			// timer;
		// timer = setTimeout(function(){
			$this.removeClass('show');
			$this.find('> a').attr('aria-expanded', false);
			// $this.find('.dropdown-menu').removeClass('animated-fast fadeInUp show');
			$this.find('.dropdown-menu').removeClass('show');
		// }, 100);
	});


	$('#dropdown04').on('show.bs.dropdown', function () {
	  console.log('show');
	});

	// scroll
	var scrollWindow = function() {
		$(window).scroll(function(){
			var $w = $(this),
					st = $w.scrollTop(),
					navbar = $('.ftco_navbar'),
					sd = $('.js-scroll-wrap');

			if (st > 150) {
				if ( !navbar.hasClass('scrolled') ) {
					navbar.addClass('scrolled');	
				}
			} 
			if (st < 150) {
				if ( navbar.hasClass('scrolled') ) {
					navbar.removeClass('scrolled sleep');
				}
			} 
			if ( st > 350 ) {
				if ( !navbar.hasClass('awake') ) {
					navbar.addClass('awake');	
				}
				
				if(sd.length > 0) {
					sd.addClass('sleep');
				}
			}
			if ( st < 350 ) {
				if ( navbar.hasClass('awake') ) {
					navbar.removeClass('awake');
					navbar.addClass('sleep');
				}
				if(sd.length > 0) {
					sd.removeClass('sleep');
				}
			}
		});
	};
	scrollWindow();

	
	var counter = function() {
		
		$('#section-counter').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {

				var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
				$('.number').each(function(){
					var $this = $(this),
						num = $this.data('number');
						console.log(num);
					$this.animateNumber(
					  {
					    number: num,
					    numberStep: comma_separator_number_step
					  }, 7000
					);
				});
				
			}

		} , { offset: '95%' } );

	}
	counter();

	var contentWayPoint = function() {
		var i = 0;
		$('.ftco-animate').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .ftco-animate.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn ftco-animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft ftco-animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight ftco-animated');
							} else {
								el.addClass('fadeInUp ftco-animated');
							}
							el.removeClass('item-animate');
						},  k * 50, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '95%' } );
	};
	contentWayPoint();


	// magnific popup
	$('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
     gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      verticalFit: true
    },
    zoom: {
      enabled: true,
      duration: 300 // don't foget to change the duration also in CSS
    }
  });

  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,

    fixedContentPos: false
  });


  $('.appointment_date').datepicker({
	  'format': 'm/d/yyyy',
	  'autoclose': true
	});

	$('.appointment_time').timepicker();




})(jQuery);



	var arr = [];
    //Intialize firebase
    const config = {
        apiKey: "AIzaSyBF6ucSKByFpQ9vQNwfb1i4JOVGyfaHPfw",
        authDomain: "mentormitr-bbff5.firebaseapp.com",
        databaseURL: "https://mentormitr-bbff5.firebaseio.com",
        projectId: "mentormitr-bbff5",
        storageBucket: "mentormitr-bbff5.appspot.com",
        messagingSenderId: "177887019473",
        appId: "1:177887019473:web:4f7049f36129cc4b0860f0",
        measurementId: "G-B7VNS84ZJ9"
    };



    firebase.initializeApp(config);

    const student = document.getElementById('Student')
    const college = document.getElementById('College')
    const parentt = document.getElementById('Parent')
    const wp = document.getElementById('wp')
    const mentor = document.getElementById('mentor');

    const first = document.getElementById('first');
    const second = document.getElementById('second');
    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    const txtPassword1 = document.getElementById('txtPassword1');
    //login ka email aur pass
    const logtxtEmail = document.getElementById('logtxtEmail');
    const logtxtPassword = document.getElementById('logtxtPassword');
    //
    const btnLogin = document.getElementById('btnLogin');
    const btnSignUp = document.getElementById('btnSignUp');

    const pnumber = document.getElementById("pnumber");



    btnLogin.addEventListener('click', e => {

        e.preventDefault
        const email = logtxtEmail.value;
        const pass = logtxtPassword.value;
        const auth = firebase.auth();
        //Sign In
        const promise = auth.signInWithEmailAndPassword(email, pass);
         promise.catch(e => alert("Email/Password is incorrect"));
    });


        // Add sign up event
    btnSignUp.addEventListener('click', e => {

        e.preventDefault();
        //TODO->Check 4 Real Email
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();
        var individual;



        if (student.checked == true) individual = student.value
        else if (college.checked == true) individual = college.value
        else if (parentt.checked == true) individual = parentt.value
        else if (wp.checked == true) individual = wp.value
        else if (mentor.checked == true) individual = mentor.value

        console.log(individual);

        if (txtPassword.value != txtPassword1.value) alert("Incorrect Confirm Password")
        else {

            //Sign In
             const promise = auth.createUserWithEmailAndPassword(email, pass).then((cred) => {

            var h = first.value + " " + second.value;

                console.log("phone number", pnumber.value);

                cred.user.updateProfile({
                    displayName: h,
                    photoURL: individual,
                    phoneNumber: pnumber.value
                })
            });


            promise
                .catch(e => alert(e.message));


        }


    });




    function login() {

        var signup = document.getElementById('id02');
        signup.style.display = "none"
        var modal = document.getElementById('id01');
        modal.style.display = "block"

            // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none ";
            }
        }


        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                // console.log(user);
                // console.log(user.photoURL);
                // console.log(user.displayName);
                // console.log(user.email)
                //  btnLogout.classList.remove("invisible");

                // user.phoneNumber = pnumber.value
                // console.log(user);

                location.href = "/middleware";


            } else {
                    // alert("You need to Login/SignUp first");
                    //location.href = "/testimonial";

                    //  alert("Please Log In... You are currently logged out");
                    //  btnLogout.classList.add("invisible");

                }
            })


        btnmentor.addEventListener('click', () => {

            location.href = "/mentorlogin";

        })


        function resetpass() {

            firebase.auth().sendPasswordResetEmail(logtxtEmail.value)
            alert("Password reset has been send to your registered email");
        }

    }
    function signup() {


            // var modal1 = document.getElementById('id01');
            // modal1.style.display = "none";
            var modal = document.getElementById('id02');

            modal.style.display = "block"
            var modal1 = document.getElementById('id01');

            modal1.style.display = "none"

            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
        }



        var db = firebase.firestore();
        db.collection("blogs").orderBy("date", "desc").get().then((snapshot) => {
            snapshot.forEach((doc) => {
                arr.push(doc.data());
            })

            var title1 = document.getElementById("title1")
            var title2 = document.getElementById("title2")
            var time1 = document.getElementById("time1");
            var time2 = document.getElementById("time2");

            title1.innerHTML = arr[0].title;
            time1.innerHTML = arr[0].creator

            title2.innerHTML = arr[1].title;
            time2.innerHTML = arr[1].creator
		})
		

		
	function openForm() {
        document.getElementById("myForm").style.display = "block";
    }

    function closeForm() {
        document.getElementById("myForm").style.display = "none";
    }