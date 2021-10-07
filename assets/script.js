let events_store = [];
document.addEventListener('DOMContentLoaded', function () {

    let selected_event;
    /** Чтение событий из локального хранилища */
    if (localStorage.getItem('calendar')) {
        events_store = JSON.parse(localStorage.getItem('calendar'));
    }
    let calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        timezone: 'UTC',
        initialView: 'dayGridMonth',
        height: 800,
        locale: 'ru',
        headerToolbar: {
            start: 'prev,next,today',
            center: 'title',
            end: 'dayGridMonth,timeGridDay'
        },
        dateClick: function(info) {
            console.log('clicked on ' + info.dateStr);
            start.value = info.dateStr;
            end.value = info.dateStr;
            $('#modal').modal('show');
           
        },      
        eventClick: function(event_info) {
            selected_event = event_info.event;
            console.log(event_info.event);
            let event_text_name_tag =  document.getElementById('event_text_name')
            event_text_name_tag.innerText = selected_event.title;
            $('#modal_del').modal('show');
        },
    });


    /** Форма Создания события*/
    let addForm = document.querySelector('.add_forms');
    let addButton = document.querySelector('.btn');
    let delButton = document.querySelector(['.del_btn']);
    let title = document.querySelector('.title');
    let time = document.querySelector('.time');
    let end_time = document.querySelector('.endTime');
    let start = document.querySelector('.start');
    let end = document.querySelector('.end');

 
    /** Привязка к событиями из Локал Сторедж */
    calendar.addEventSource(events_store);

    /** Создание календаря */
    calendar.render();

    /** Дата начала события */
    let startDate;
    /** Дата конца события */
    let endDate;


    /** Добавление данных в календарь */
    addButton.addEventListener('click', () => { 
       // Задали стартовую дату связав со временем.
       startDate = time.value == false ?  new Date(start.value) : (new Date(start.value)).setHours(+time.value.split(':')[0], +time.value.split(':')[1]);
       // Задали дату окончания события
       endDate = end_time.value == false ? (new Date(start.value)).setHours(+time.value.split(':')[0]+2, +time.value.split(':')[1])        
       : new Date(end.value).setHours(+end_time.value.split(':')[0], +end_time.value.split(':')[1]);
       let event;
            event = {
                id: startDate.toString(),
                title: title.value,
                start: startDate,
                end: endDate,
                borderColor: '#d3af6c',
                backgroundColor: '#d3af6c'
            }
       calendar.addEvent(event);
       events_store.push(event);
       localStorage.setItem('calendar', JSON.stringify(events_store));
       addForm.reset();
       $('#modal').modal('hide');
        
    });

    /** Удаление событий из календаря */
    delButton.addEventListener('click', () => {
        let id = selected_event.id;
        let deleted_event = calendar.getEventById(selected_event.id);
        events_store = events_store.filter((eventObj) => { 
            return eventObj.id !== id;
     
        });
        localStorage.setItem('calendar', JSON.stringify(events_store));
        deleted_event.remove();
        $('#modal_del').modal('hide');
       
    })
});
