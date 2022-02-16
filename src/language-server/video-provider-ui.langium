grammar VideoProviderUi
hidden(WS, SL_COMMENT, ML_COMMENT)

App:
    'application' name=ID
    '-' 'favicon' favicon=STRING
    (pages+=Page)*;

Page:
    'page' name=ID
    vues+=Vue (',' vues+=Vue)* ':'
    ('header' ':' Layout)?
    'body' ':' Layout
    ('footer' ':' Layout)?;

Layout:
    '-' ('column' '(' columnSize+=INT (',' columnSize+=INT)* ')' type='column' | 'row' type='row') ':'
    (components+=Component)*;

Component:
    '-' componentName=ID;



Vue returns string: 'desktop' | 'tablet' | 'mobile';

terminal WS: /\s+/;
terminal ID: /[_a-zA-Z][\w_]*/;
terminal INT returns number: /[0-9]+/;
terminal STRING: /"[^"]*"|'[^']*'/;

terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
terminal SL_COMMENT: /\/\/[^\n\r]*/;
