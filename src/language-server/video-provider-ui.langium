grammar VideoProviderUi
hidden(WS, SL_COMMENT, ML_COMMENT)

App: Body;

Body:
    name=ID (components+=Component)*;

Component:
    (Carousel | Paragraph);

Carousel:
    'carousel';

Paragraph:
    'paragraph';

terminal WS: /\s+/;
terminal ID: /[_a-zA-Z][\w_]*/;
terminal INT returns number: /[0-9]+/;
terminal STRING: /"[^"]*"|'[^']*'/;

terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
terminal SL_COMMENT: /\/\/[^\n\r]*/;
