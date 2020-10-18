   
//aby dodać nowe pytanie:
//dodaj je do listy questions
//dodaj odpowiedź do listy odpowiedzi każdego z kandydatów
//w HTMLu dodaj nowy step oraz step do pokazywania odpowiedzi
//dodaj przyciski do dwóch pagination
//dodaj event listenery do tych przycisków


    var current_question = 0;
    var testbuttonnext = document.getElementsByClassName("test-button-next");
    var next_question_num = current_question + 1;
    //alert(testbuttonnext.length);

    //Adds functionality to the "I agree", "I disagree" and "I don't mind" buttons
    const user_answers = [];

    var agreed = document.getElementsByClassName("agreed");
    var nonagreed = document.getElementsByClassName("non-agreed");
    var neutral = document.getElementsByClassName("neutral");

    for (var i = 0; i < agreed.length; i++) {
        agreed[i].addEventListener("click", function(){setAnswer(1)})
    };
    for (var i = 0; i < nonagreed.length; i++) {
        nonagreed[i].addEventListener("click", function(){setAnswer(2)})
    };
    for (var i = 0; i < neutral.length; i++) {
        neutral[i].addEventListener("click", function(){setAnswer(3)})
    };

    var all_steps_len = document.getElementsByClassName("test-step").length;

    

    // end of the section

    for (var i = 0; i < testbuttonnext.length; i++) {
        testbuttonnext[i].addEventListener("click", function(){nextQuestion(current_question + 1)})
    };

    function explanationWindowClose(window_num){
        var explanation_window_id = 'explanation_' + window_num.toString();
        var explanation_window = document.getElementById(explanation_window_id);
        explanation_window.style.display = 'none';
    }


    function nextQuestion(question_num) {

        var all_active = document.getElementsByClassName('active');
        for (i=0; i<all_active.length;i++){
            all_active[i].classList.remove('active');
        }



        //alert(question_num);
        if (user_answers.length < question_num){
            
        var pagination_div = document.getElementById("pagination");
        pagination_div.style.display = "flex";
        var all_step = document.getElementsByClassName("test-step");
        //alert(all_step.length);
        for(i=0; i<all_step.length; i++){
            //alert('Sprawdzam ' + i.toString());
            if(all_step[i].classList.contains('inactive') == false && i != question_num){
                    all_step[i].classList.add('inactive');   
            }
        }
        //previous_question 
        previous_question = current_question;
        current_question = question_num;
        if (current_question != all_step.length) {
        var step_to_show_name = 'step_' + question_num.toString();
        var step_to_show = document.getElementById(step_to_show_name);
        step_to_show.className = step_to_show.className.replace(" inactive", "");
        
        } else {
        //alert(user_answers);
        var result_chart = document.getElementById("test-results");
        result_chart.style.display = "block";
        resultCheck();
        };

        var prev_question_pagination = document.getElementById("change-to-" + (previous_question).toString());
        //prev_question_pagination.addEventListener("click", function(){nextQuestion(previous_question)})
        if(prev_question_pagination.classList.contains('done') == false){
            prev_question_pagination.classList.add('done');
        }
        
        var all_active = document.getElementsByClassName('active');
        //alert(all_active.length);
        for (i=0; i<all_active.length;i++){
            all_active[i].classList.remove('active');
        }

        var current_question_pagination = document.getElementById("change-to-" + question_num.toString());
        current_question_pagination.classList.add('active');
    } else{
        //alert('cofanie');
        var prev_question_pagination = document.getElementById("change-to-" + current_question.toString());
        //prev_question_pagination.addEventListener("click", function(){nextQuestion(current_question)});
        if(prev_question_pagination.classList.contains('unlock') == false){
            prev_question_pagination.classList.add('unlock');
        }
        if(current_question <= user_answers.length){
            prev_question_pagination.classList.add('done');
        }

        var all_active = document.getElementsByClassName('active');
        for (i=0; i<all_active.length;i++){
            all_active[i].classList.remove('active');
        }
        

        current_question = question_num;

        var current_question_pagination = document.getElementById("change-to-" + question_num.toString());
        current_question_pagination.classList.add('active');
        current_question_pagination.classList.remove('done');

        var all_step = document.getElementsByClassName("test-step");
        //alert(all_step.length);
        for(i=0; i<all_step.length; i++){
            //alert('Sprawdzam ' + i.toString());
            if(all_step[i].classList.contains('inactive') == false && i != question_num){
                    all_step[i].classList.add('inactive');   
            }
        }
        var step_to_show_name = 'step_' + question_num.toString();
        var step_to_show = document.getElementById(step_to_show_name);
        step_to_show.className = step_to_show.className.replace(" inactive", "");


        var previous_user_answer = user_answers[question_num - 1];
        if(previous_user_answer == 1){
            step_to_show.getElementsByClassName('agreed')[0].classList.add('test-button-active');
        } else if (previous_user_answer == 2){
            step_to_show.getElementsByClassName('non-agreed')[0].classList.add('test-button-active');
        } else if (previous_user_answer == 3){
            step_to_show.getElementsByClassName('neutral')[0].classList.add('test-button-active');
        }
    }
    }



    // explanation window section

    //var explanation_link_1 = document.getElementById("explanation-open-1");
    //var explanation_window_1 = document.getElementById("explanation_1");

    //explanation_link_1.addEventListener("click", function(){explanation_window_1.style.display = 'block'});

    //var explanation_close_btn_1 = document.getElementById("explanation_close_1");
    //explanation_close_btn_1.addEventListener("click", function(){explanation_window_1.style.display = 'none'})

    function setAnswer(userAnswer){
        //alert('Twoja odpowiedź to ' + userAnswer.toString());
        if(user_answers.length < current_question){
            user_answers.push(userAnswer);
        } else{
            var user_answer_index = current_question - 1;
            user_answers[user_answer_index] = userAnswer;
        }
        //alert(user_answers);
        
        var all_active_test_buttons = document.getElementsByClassName('test-button-active');
        for(i=0; i<all_active_test_buttons.length; i++){
            all_active_test_buttons[i].classList.remove('test-button-active');
        }
    }

    // end of the explanation window section

    
    function setPagination(num){
        if(user_answers.length +1 >= num){
            //alert('pag');
            nextQuestion(num);
        }
    }
    
    document.getElementById("change-to-1").addEventListener("click", function(){setPagination(1)});
    document.getElementById("change-to-2").addEventListener("click", function(){setPagination(2)});
    document.getElementById("change-to-3").addEventListener("click", function(){setPagination(3)});
    document.getElementById("change-to-4").addEventListener("click", function(){setPagination(4)});
    document.getElementById("change-to-5").addEventListener("click", function(){setPagination(5)});
    document.getElementById("change-to-6").addEventListener("click", function(){setPagination(6)});
    document.getElementById("change-to-7").addEventListener("click", function(){setPagination(7)});
    document.getElementById("change-to-8").addEventListener("click", function(){setPagination(8)});
    document.getElementById("change-to-9").addEventListener("click", function(){setPagination(9)});
    document.getElementById("change-to-10").addEventListener("click", function(){setPagination(10)});

    //var current_question = 0;
    var questions = ["Uważam, że reżim sanitarny w Czackim powinien zostać zaostrzony.",
    "Moim zdaniem samorząd powinien podjąć wszelkich starań w celu rezygnacji Ministerstwa Edukacji Narodowej z decyzji o zdalnym systemie nauczania na korzyść innych metod np.: systemu hybrydowego.",
    "Ważne dla mnie jest, żeby samorząd negocjował z dyrekcją o istnieniu ogólnodostępnego czajnika oraz mikrofalówki.",
    "Ważne dla mnie jest poszerzenie oferty sportowej szkoły.", 
    "Ważne dla mnie są negocjacje z Okienkiem w celu obniżenia cen dla Czackiewiczów.",
    "Moim zdaniem elitarność sekcji oraz ich działalności w Czackim powinna zostać zmniejszona.",
    "Uważam, że Czacki powinien zrezygnować ze współpracy z Technikum.",
    "Ważne dla mnie jest utworzenie systemu zgłaszania inicjatyw uczniowskich.",
    "Uważam, że w Czackim powinny się odbywać spotkania z różnymi osobami aktywnymi politycznie, niezależnie od ich poglądów.",
    "Uważam, iż społeczność Czackiego powinna brać czynny udział w akcjach typu Tęczowy Piątek."];

    //0 - brak odpowiedzi,
    //1 - tak,
    //2 - nie,
    //3 - nie mam zdania

    //var odp_duda = [1, 2, 2, 1];
    //var odp_biedron = [1, 1, 1, 3];
    //var odp_trzaskowski = [2, 2, 1, 2];
    //var odp_bosak = [1, 2, 1, 1];
    //var odp_zoltek = [1, 2, 3, 1];

    //var candidates_answers = [odp_duda, odp_biedron, odp_trzaskowski, odp_bosak];
    //var candidates_surnames = ["A. Duda", "R. Biedroń", "R. Trzaskowski", "K. Bosak"];

    var odp_konsole = [1, 2, 1, 1, 1, 2, 2, 1, 1, 1];
    var odp_kopytulski = [2, 2, 1, 1, 1, 2, 2, 1, 1, 1];
    var odp_paulina_i_mikolaj = [1, 2, 3, 1, 1, 2, 2, 1, 1, 1];
    var odp_wrzosek_ziemba = [2, 1, 2, 1, 1, 2, 2, 1, 2, 2];

    var candidates_answers = [odp_konsole, odp_kopytulski, odp_paulina_i_mikolaj, odp_wrzosek_ziemba];
    var candidates_surnames = ["KONSOLE", "KOPYTULSKI2020", "PAULINA I MIKOŁAJ", "WRZOSEK ZIEMBA 2020"];
    var candidates_imgs = ["konsole.png", "kopytulski.png", "ku.png", "wrzosek-ziemba.png"];


    
    function resultCheck(){
        var pagination_div = document.getElementById("pagination");
        pagination_div.style.display = "none";
        var results = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        //alert(user_answers.length);
        var max_points = 3 * user_answers.length;

        var i;
        for (i=0; i<=questions.length; i++) {
            var j;
            for (j=0; j<candidates_answers.length; j++){

                var current_user_answer = user_answers[i];
                var current_candidate = candidates_answers[j];
                var current_candidate_answer = current_candidate[i];



                if (current_user_answer == current_candidate_answer && (current_user_answer == 1 || current_user_answer == 2)) {
                    results[j] += 3;
                } else if (current_user_answer == current_candidate_answer && current_user_answer == 3) {
                    results[j] += 2;
                } else if (current_user_answer == 3 || current_candidate_answer == 3) {
                    results[j] += 1;
                }

                //alert("obecnie sprawdzany kandydat to " + candidates_surnames[j] + ". Jego odpowiedź to " + current_candidate_answer.toString() + ", zaś moja to " + current_user_answer.toString() + ". Za to pytanie kandydat otrzymał " + results[j].toString());
            }
        }
        //alert (results);

        var result_string = "Oto Twoje wyniki! ";

        var results_completed = [];

        var k;
        for (k=0; k<candidates_answers.length; k++) {
            var current_candidate_result = [];
            var result_percent = results[k] / max_points * 100
            result_percent = Math.round(result_percent);
            current_candidate_result.push(result_percent);

            var current_candidate_surname = candidates_surnames[k];
            current_candidate_result.push(current_candidate_surname);

            results_completed.push(current_candidate_result);

            var string_to_add = candidates_surnames[k] + ": " + result_percent.toString() +"%, "
            result_string += string_to_add;
        }

        //alert(result_string);
        var current_max_percent = -1;
        var current_max_percent_name;
        //alert(results_completed.length);

        var loop_len = results_completed.length + 1;
        for(k=0; k<=loop_len; k++){
            var candidate_to_be_assigned;
            for (j=0; j<results_completed.length; j++){
                if(results_completed[j][0] > current_max_percent){
                    current_max_percent = results_completed[j][0];
                    current_max_percent_name = results_completed[j][1];
                    candidate_to_be_assigned = j;
                    
                }
                        
            };
            setCandidate(k, current_max_percent, current_max_percent_name);
            results_completed.splice(candidate_to_be_assigned, 1);
            current_max_percent = -1;
            //alert(results_completed);
        };
    };


function setCandidate(position, percent, surname){
    var candidate_position = position + 1;
    var candidate_name_id = "candidate-name-" + candidate_position.toString();
    var candidate_name_p = document.getElementById(candidate_name_id);
    candidate_name_p.innerHTML = surname;

    var candidate_percent_txt = percent.toString() + "%";
    var candidate_percent_id = "candidate-percent-" + candidate_position.toString();
    var candidate_percent_p = document.getElementById(candidate_percent_id);
    candidate_percent_p.innerHTML = candidate_percent_txt;

    var candidate_progressbar_id = "progressbar-results-" + candidate_position.toString();
    var candidate_progressbar = document.getElementById(candidate_progressbar_id);
    candidate_progressbar.style.width = candidate_percent_txt;

    var candidate_img_id =  "candidate-img-" + candidate_position.toString();
    var candidate_img = document.getElementById(candidate_img_id);
    var candidate_img_src;
    if(surname == "KONSOLE"){
        candidate_img_src = "assets/img/konsole.png";
    } else if(surname == "KOPYTULSKI2020"){
        candidate_img_src = "assets/img/kopytulski.png";
    } else if(surname == "PAULINA I MIKOŁAJ"){
        candidate_img_src = "assets/img/ku.png";
    } else if(surname == "WRZOSEK ZIEMBA 2020"){
        candidate_img_src = "assets/img/wrzosek-ziemba.png";
    } else{
        candidate_img_src = "assets/img/question-mark.png"
    }
    candidate_img.src = candidate_img_src;
}



// adds functionality to the "show campaign committes answers" button

var show_campaign_committes_answers_btn = document.getElementById("show_campaign_committes_answers_btn");
show_campaign_committes_answers_btn.addEventListener("click", function(){
    var result_chart = document.getElementById("test-results");
    result_chart.style.display = "none";
    var campaign_committes_answers_questionnaire = document.getElementById("campaign_committes_answers_questionnaire");
    campaign_committes_answers_questionnaire.style.display = "block";
    setCommitteesImg(1);
    document.getElementById('answers_step_1').style.display = "block";
    document.getElementById('answers_pagination').style.display = 'block';
    document.getElementById('test-questioner').style.display = 'none';
})

function setCommitteesImg(answers_question_num){
    var answer_step = document.getElementById('answers_step_' + answers_question_num.toString());
    if(answer_step.classList.contains('committee-img-done') == false){

    var answer_index = answers_question_num - 1;
    for(i=0; i<candidates_answers.length; i++){
        var candidate_answer = candidates_answers[i][answer_index];
        var current_candidate_img_src = "assets/img/" + candidates_imgs[i];
        var new_committee_img = document.createElement('img');
        new_committee_img.src = current_candidate_img_src;
        if(candidate_answer == 1){
            var answers_agreed_id = 'committee_answers_agreed_' + answers_question_num.toString();
            var answers_agreed = document.getElementById(answers_agreed_id);
            answers_agreed.appendChild(new_committee_img);
        } else if(candidate_answer == 2){
            var answers_non_agreed_id = 'committee_answers_non_agreed_' + answers_question_num.toString();
            var answers_non_agreed = document.getElementById(answers_non_agreed_id);
            answers_non_agreed.appendChild(new_committee_img);
        } else{
            var answers_neutral_id = 'committee_answers_neutral_' + answers_question_num.toString();
            var answers_neutral = document.getElementById(answers_neutral_id);
            answers_neutral.appendChild(new_committee_img);
        }
        new_committee_img.classList.add('committee_answers_img');
        answer_step.classList.add('committee-img-done');
    }

    }
}

function nextCommitteeAnswers(answers_question_num){
    //alert('a');
    document.getElementById('answers_step_1').style.display = "none";

    var all_answer_steps = document.getElementsByClassName('answers_step');
    //alert(all_answer_steps.length);
    for(i=0;i<all_answer_steps.length;i++){
        all_answer_steps[i].style.display = "none";
    }


    document.getElementById('answers_step_' + answers_question_num.toString()).style.display = "block";
    paginationCommitteesAnswers(answers_question_num);
    setCommitteesImg(answers_question_num);
}

function paginationCommitteesAnswers(answers_question_num){
    var all_answer_active = document.getElementsByClassName('answer_active');
    for(i=0;i<all_answer_active.length;i++){
        all_answer_active[i].classList.remove('answer_active');
    }
    var pagination_answers_to_get_active = document.getElementById('answers_change-to-' + answers_question_num.toString());
    pagination_answers_to_get_active.classList.add('answer_active');
}

document.getElementById('answers_change-to-1').addEventListener("click", function(){nextCommitteeAnswers(1)});
document.getElementById('answers_change-to-2').addEventListener("click", function(){nextCommitteeAnswers(2)});
document.getElementById('answers_change-to-3').addEventListener("click", function(){nextCommitteeAnswers(3)});
document.getElementById('answers_change-to-4').addEventListener("click", function(){nextCommitteeAnswers(4)});
document.getElementById('answers_change-to-5').addEventListener("click", function(){nextCommitteeAnswers(5)});
document.getElementById('answers_change-to-6').addEventListener("click", function(){nextCommitteeAnswers(6)});
document.getElementById('answers_change-to-7').addEventListener("click", function(){nextCommitteeAnswers(7)});
document.getElementById('answers_change-to-8').addEventListener("click", function(){nextCommitteeAnswers(8)});
document.getElementById('answers_change-to-9').addEventListener("click", function(){nextCommitteeAnswers(9)});
document.getElementById('answers_change-to-10').addEventListener("click", function(){nextCommitteeAnswers(10)});