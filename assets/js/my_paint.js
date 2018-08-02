$(document).ready(function () {
    let draw,
        started = false,
        context,
        strokes = [],
        color = '#000000',
        last_color = null,
        tools = 'brush',
        secondClick = null,
        firstX,
        firstY,
        last_tools,
        fill,
        brush_type;


    $('#canvas').mousedown(function (event) {
        let cursorX = event.pageX - this.offsetLeft;
        let cursorY = event.pageY - this.offsetTop;
        let width_brush = $('#brush_size').val();
        brush_type = $('input:radio[name=brush_type]:checked').val();
        context = this.getContext("2d");
        if (tools == 'brush') {
            draw = true;
        }
        else if (tools == 'line') {

            if (!secondClick) {
                context.beginPath();
                context.moveTo(cursorX, cursorY);
                secondClick = true;
            }
            else {
                context.lineTo(cursorX, cursorY);
                context.strokeStyle = color;
                context.lineWidth = width_brush;
                context.lineCap = brush_type;
                context.stroke();
                secondClick = false;
            }
        }
        else if (tools == 'rectangle') {

            if (!secondClick) {
                firstX = cursorX
                firstY = cursorY;
                context.beginPath();
                context.moveTo(cursorX, cursorY);
                secondClick = true;
            }
            else {
                if (fill) {
                    context.fillStyle = color;
                    context.fillRect(firstX, firstY, cursorX - firstX, cursorY - firstY);
                } else {
                    context.lineCap = brush_type;
                    context.strokeStyle = color;
                    context.lineWidth = width_brush;
                    context.rect(firstX, firstY, cursorX - firstX, cursorY - firstY);
                }
                context.stroke();
                secondClick = false;
            }
        }
        else if (tools == 'circle') {
            if (!secondClick) {
                firstX = cursorX
                firstY = cursorY;
                context.beginPath();
                secondClick = true;
            }
            else {
                context.strokeStyle = color;
                context.fillStyle = color;
                context.lineWidth = width_brush;
                context.arc(firstX, firstY, Math.sqrt(Math.pow(firstX - cursorX, 2) + Math.pow(firstY - cursorY, 2)), 0, 2 * Math.PI);
                if (fill) {
                    context.fill();
                }
                context.lineCap = brush_type;
                context.stroke();
                secondClick = false;
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
                context.lineCap = brush_type;
                context.stroke();
            }
        }
    });

    $(this).one('mousemove', function () {
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
        clearClass();
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
        secondClick = null;
    });

    $('#undo').click(function () {
    });

    $('#save').click(function () {
        window.open($('#canvas')[0].toDataURL('image/png'));
    });

    $('#erease').click(function () {
        secondClick = null;
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
        secondClick = null;
        tools = "brush";
        clearClass();
    });

    $('#line').click(function () {
        secondClick = null;
        tools = "line";
        clearClass();
        $('#canvas').addClass('line');
    });

    $('#rectangle').click(function () {
        secondClick = null;
        tools = "rectangle";
        clearClass();
        $('#canvas').addClass('rectangle');
    });

    $('#circle').click(function () {
        secondClick = null;
        tools = "circle";
        clearClass();
        $('#canvas').addClass('circle');

    });

    $('#fill').change(function () {
        if ($(this).is(':checked')) {
            fill = true;
        } else {
            fill = false;
        }
    });
});

function clean(context) {
    context.clearRect(0, 0, $('#canvas').width(), $('#canvas').height());
    context.fillStyle = "#f5f5f5";
    context.fillRect(0, 0, $('#canvas').width(), $('#canvas').height());
}


function clearClass() {
    $('#canvas').removeClass('erase');
    $('#canvas').removeClass('line');
    $('#canvas').removeClass('rectangle');
    $('#canvas').removeClass('circle');
}