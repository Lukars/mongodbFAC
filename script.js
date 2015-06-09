var search = $('#search'),
    create = $('#create'),
    fact = $('#fact'),
    facName = $('#facName'),
    addUser = $('#addUser'),
    results = $('#results'),
    deleteButton = $('#delete');

search.click(function() {
    var name = search.val();
    $.get( '/read&' + name, function(data) {
        if (data = '[]'){
            addUser.removeClass('hidden');
            search.addClass('hidden');
        } else {
            console.log(data);
            deleteButton.removeClass('hidden');
            results.append(data);
        }
    });
});

create.click(function() {
    var user = {name : facName.val(), fact : fact.val()};
    $.post('/create', user, function(data) {
        console.log('User Created');
    });
});

deleteButton.click(function() {
    var name = facName.val();
    $.ajax({url : })
})
