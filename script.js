var search = $('#search'),
    create = $('#create'),
    fact = $('#fact'),
    facName = $('#facName'),
    addUser = $('#addUser'),
    results = $('#results');

search.click(function() {
    var name = search.val();
    $.get( '/read&' + name, function(data) {
        if (!data.length){
            addUser.removeClass('hidden');
            search.addClass('hidden');
        } else {
            console.log(data);
            results.append(data);
        }
    });
});

create.click(function() {
    var user = {name : search.val(), fact : fact.val()};
    $.post('/create', user, function(data) {
        console.log('User Created');
    });
});
