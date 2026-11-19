'use strict';
const questions = [
['An attorney wants the opposing party to answer written questions under oath. Which discovery method should the attorney use?',['Deposition','Interrogatories','Request for Production','Physical Examination'],1,'Interrogatories are written questions answered under oath by a party.'],
['An attorney wants to question a witness orally under oath before trial. Which discovery method is appropriate?',['Interrogatories','Request for Admission','Deposition','Request for Production'],2,'A deposition allows an attorney to question a person under oath before trial. The testimony is recorded.'],
['An attorney wants copies of photographs taken at an accident scene from the opposing party. Which discovery method should the attorney use?',['Request for Production','Interrogatories','Physical Examination','Request for Admission'],0,'Requests for Production are used to obtain documents, photographs, electronic records, and other materials.'],
['An attorney wants the opposing party to admit that a contract was signed on June 1. Which discovery method is appropriate?',['Deposition','Request for Admission','Physical Examination','Interrogatories'],1,'Requests for Admission ask a party to admit or deny specified facts or other matters within the rule.'],
["A plaintiff's physical condition is in controversy in a personal injury lawsuit. The defendant seeks an examination of the plaintiff under the applicable rules. Which discovery method is involved?",['Interrogatories','Request for Admission','Physical Examination','Request for Production'],2,"A physical examination may be obtained under the applicable procedural requirements when a party's physical condition is in controversy."],
['Who ordinarily answers interrogatories?',['The judge','The court reporter','The party receiving them','The opposing attorney personally'],2,'Interrogatories are directed to a party, who provides answers under oath.'],
["What is a court reporter's role during a typical deposition?",['Decide which attorney wins','Record the testimony','Represent the witness','Issue the final judgment'],1,'A court reporter records deposition testimony and prepares the transcript.'],
['Which discovery method is commonly used to obtain relevant emails from an opposing party?',['Request for Production','Physical Examination','Request for Admission','Medical Examination'],0,'Requests for Production can be used to obtain electronically stored information, including emails.'],
['Which of the following is an example of a deposition question?',['“Please produce copies of your medical bills.”','“Please admit that you signed the agreement.”','“Where were you standing when the accident occurred?”','“Please provide copies of all photographs.”'],2,'During a deposition, an attorney asks a person questions orally, and the answers are recorded as testimony.'],
['A paralegal is asked to prepare a deposition digest. What should the paralegal do?',["Rewrite the witness's testimony to improve it",'Summarize testimony and include transcript page and line references','Decide whether the witness is telling the truth','Remove unfavorable testimony'],1,'A deposition digest summarizes important testimony and identifies where it appears in the transcript.'],
['An attorney sends written statements asking the opposing party to admit or deny specific facts. What are these called?',['Interrogatories','Requests for Admission','Depositions','Physical Examinations'],1,'Requests for Admission help establish which matters are disputed and which are admitted.'],
['A paralegal receives discovery responses containing hundreds of pages of documents. What is an appropriate task?',['Organize and label the documents for attorney review','Destroy documents that seem unimportant','Change documents containing unfavorable information','Send everything directly to the judge'],0,'Paralegals help organize discovery materials and assist attorneys in reviewing and managing documents.'],
['Which statement about interrogatories is correct?',['They are always answered orally.','They are written questions directed to a party.','They are questions asked only by judges.','They are the same as depositions.'],1,'Interrogatories are written discovery questions directed to a party and answered under oath.'],
['A paralegal notices that a discovery response may be missing requested documents. What should the paralegal do?',['Ignore the problem','Create replacement documents',"Bring the issue to the supervising attorney's attention",'Tell the opposing party that the case is dismissed'],2,'Paralegals should identify potential discovery problems and notify the supervising attorney.'],
['Why do attorneys use discovery in civil litigation?',['To gather information and evidence relevant to the case','To guarantee that their client wins','To replace the judge','To avoid preparing for trial'],0,'Discovery allows parties to obtain information, evaluate claims and defenses, and prepare for litigation.']
];
const $ = id => document.getElementById(id);
let index = 0, score = 0, answered = false;
function showQuestion(){
  const [prompt, choices] = questions[index]; answered = false;
  $('progress').textContent = `Question ${index + 1} of ${questions.length}`;
  $('progress-fill').style.width = `${(index / questions.length) * 100}%`;
  $('question-number').textContent = String(index + 1).padStart(2,'0');
  $('question-title').textContent = prompt;
  $('answers').replaceChildren(); $('feedback').hidden = true; $('next').hidden = true;
  choices.forEach((choice, i) => { const button = document.createElement('button'); button.className='answer'; button.type='button'; const letter=document.createElement('span'); letter.className='letter'; letter.textContent=String.fromCharCode(65+i); letter.setAttribute('aria-hidden','true'); const label=document.createElement('span'); label.textContent=choice; button.append(letter,label); button.addEventListener('click',()=>selectAnswer(i)); $('answers').append(button); });
}
function selectAnswer(choice){
  if(answered) return; answered = true;
  const [, choices, correct, explanation] = questions[index];
  const isCorrect = choice === correct; if(isCorrect) score++;
  [...$('answers').children].forEach((button,i)=>{button.disabled=true; if(i===correct) button.classList.add('correct'); else if(i===choice) button.classList.add('incorrect');});
  const feedback=$('feedback'); feedback.classList.toggle('wrong',!isCorrect); feedback.replaceChildren();
  const heading=document.createElement('strong'); heading.textContent=isCorrect?'Correct!':'Not quite!';
  const text=document.createElement('span'); text.textContent=(isCorrect?'':`The correct answer is ${choices[correct]}. `)+explanation;
  feedback.append(heading,text); feedback.hidden=false; $('next').hidden=false;
  $('next').firstChild.textContent = index===questions.length-1?'See results ':'Next question ';
}
$('start').addEventListener('click',()=>{$('intro').hidden=true; $('game').hidden=false; showQuestion(); $('question-title').focus();});
$('next').addEventListener('click',()=>{if(!answered)return; index++; if(index<questions.length){showQuestion(); $('question-title').focus();}else{$('game').hidden=true; $('result').hidden=false; $('score').textContent=`${score} / ${questions.length}`; $('encouragement').textContent=score===questions.length?'Excellent work! You identified every method and task.':'Nice work completing the review. You can play again to practice the concepts.'; $('result-title').focus();}});
$('again').addEventListener('click',()=>{index=0;score=0;$('result').hidden=true;$('game').hidden=false;showQuestion();$('question-title').focus();});
