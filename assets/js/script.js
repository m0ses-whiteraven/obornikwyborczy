var questions = ["Konsul powinien informować uczniów, dokąd nocą tupta jeż.",
"Konsul powinien być prostym chłopakiem z Krosna.",
"Debata w TVP jest ustawiona.",
"Rafał kłamie."];

//0 - brak odpowiedzi,
//1 - tak,
//2 - nie,
//3 - nie mam zdania

var odp_duda = [1, 2, 2, 1];
var odp_biedron = [1, 1, 1, 3];
var odp_trzaskowski = [2, 2, 1, 2];
var odp_bosak = [1, 2, 1, 1];
var odp_zoltek = [1, 2, 3, 1];

var candidates_answers = [odp_duda, odp_biedron, odp_trzaskowski, odp_bosak, odp_zoltek];
var candidates_surnames = ["A. Duda", "R. Biedroń", "R. Trzaskowski", "K. Bosak", "S. Żółtek"];

var user_answers = [1, 1, 2, 1];

var results = [0, 0, 0, 0, 0];
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


var result_string = "Oto Twoje wyniki! ";

var k;
for (k=0; k<candidates_answers.length; k++) {
    var result_percent = results[k] / max_points * 100
    result_percent = Math.round(result_percent);
    var string_to_add = candidates_surnames[k] + ": " + result_percent.toString() +"%, "
    result_string += string_to_add;
}