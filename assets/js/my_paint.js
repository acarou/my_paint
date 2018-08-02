$(document).ready(function () {
    let draw,
        started = false,
        context,
        strokes = [],
        color = '#000000',
        last_color = null,
        tools = 'brush',
        segondClick = null,
        firstX,
        firstY,
        last_tools;


    $('#canvas').mousedown(function () {
        let cursorX = event.pageX - this.offsetLeft;
        let cursorY = event.pageY - this.offsetTop;
        let width_brush = $('#brush_size').val();
        context = this.getContext("2d");
        if (tools == 'brush') {
            draw = true;
        }
        else if (tools == 'line') {

            if (!segondClick) {
                context.beginPath();
                context.moveTo(cursorX, cursorY);
                segondClick = true;
            }
            else {
                context.lineTo(cursorX, cursorY);
                context.strokeStyle = color;
                context.lineWidth = width_brush;
                context.lineCap = "round";
                context.stroke();
                segondClick = false;
            }
        }
        else if (tools == 'square') {

            if (!segondClick)  {
                firstX = cursorX
                firstY = cursorY;
                context.beginPath();
                context.moveTo(cursorX, cursorY);
                segondClick = true;
            }
            else
            {
                context.strokeStyle = color;
                context.lineWidth = width_brush;
                context.rect(firstX,firstY,cursorX-firstX,cursorY-firstY);
                context.stroke();
                segondClick = false;
            }
        }
        else if (tools == 'circle') {
            if (!segondClick)  {
                console.log('permier click');
                firstX = cursorX
                firstY = cursorY;
                context.beginPath();
                segondClick = true;
            }
            else
            {
                console.log('deuxiéme click');
                context.strokeStyle = color;
                context.lineWidth = width_brush;
                context.arc(firstX,firstY,cursorX-firstX,0,2*Math.PI);
                context.stroke();
                segondClick = false;
            }
        }
    });

    $('#canvas').mousemove(function (event) {
        let cursorX = event.pageX - this.offsetLeft;
        let cursorY = event.pageY - this.offsetTop;
        let width_brush = $('#brush_size').val();
        context = this.getContext("2d");
        $('#x').text('x : ' + cursorX);
        $('#y').text('y : ' + cursorY);
        $('#used_tools').text('tools : ' + tools);

        if (draw) {
            if (!started) {
                context.beginPath();
                context.moveTo(cursorX, cursorY);
                started = true;
            }
            else {
                context.lineTo(cursorX, cursorY);
                context.strokeStyle = color;
                context.lineWidth = width_brush;
                context.lineCap = "round";
                context.stroke();
            }
        }
    });

    $(this).one('mousemove', function() {
        $('#canvas').trigger('mousemove');
        clean(context);
    });

    $(this).mouseup(function () {
        draw = false;
        started = false;
    });

    $('#color_picker').on('input', function () {
        color = this.value;
        last_color = null;
        clear();
        $('#canvas').addClass(last_tools);
        if (last_tools) {
            tools = last_tools;
            last_tools = null;
        }
    });

    $('#brush_size').on('input', function () {
        $('#brush_info').val(this.value + ' pixels');
    });

    $('#clear').click(function () {
        clean(context);
        segondClick = null;
    });

    $('#undo').click(function () {
    });

    $('#save').click(function () {
        $('#canvas')[0].getContext('2d');
        $('#canvas')[0].toDataURL();
    });

    $('#erease').click(function () {
        segondClick = null;
        if (!last_color) {
            last_tools = tools;
            tools = 'brush';
            last_color = color;
            color = "#f5f5f5";
            $('#color_picker').val(color);
            clearClass();
            $('#canvas').addClass('erase');
        }
        else {
            tools = last_tools;
            color = last_color;
            $('#color_picker').val(color);
            clearClass();
            $('#canvas').addClass(tools);
            last_color = null;
            last_tools = null;

        }
    });

    $('#brush').click(function () {
        segondClick = null;
        tools = "brush";
        clearClass();
    });

    $('#line').click(function () {
        segondClick = null;
        tools = "line";
        clearClass();
        $('#canvas').addClass('line');
    });

    $('#square').click(function () {
        segondClick = null;
        tools = "square";
        clearClass();
        $('#canvas').addClass('square');
    })

    $('#circle').click(function () {
        segondClick = null;
        tools = "circle";
        clearClass();
        $('#canvas').addClass('circle');

    })
});

function clean(context) {
    context.clearRect(0, 0, $('#canvas').width(), $('#canvas').height());
    context.fillStyle = "#f5f5f5";
    context.fillRect(0, 0, $('#canvas').width(), $('#canvas').height());
}


function clearClass() {
    $('#canvas').removeClass('erase');
    $('#canvas').removeClass('line');
    $('#canvas').removeClass('square');
    $('#canvas').removeClass('circle');

}