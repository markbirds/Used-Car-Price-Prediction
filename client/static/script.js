$(document).ready(function(){
    $('#predict').click(function(){
        var transmission = $('#transmission').val()
        var fuel = $('#fuel').val()
        var owner = $('#owner').val()
        var year = $('#year').val()
        var km_driven = $('#km_driven').val()
        if(transmission&&fuel&&owner&&year&&km_driven){
            $('#fill').text('');
            $.post('/predict',{
                transmission: transmission,
                fuel: fuel,
                owner: owner,
                year: year,
                km_driven: km_driven
            },function(data,status){
                $('#price').val("Php "+data['estimated_price']);
            })
        }else{
            $('#fill').text('Please fill out this field.');
        }
    });
});