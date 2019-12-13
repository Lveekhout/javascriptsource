set serveroutput on size 1000000 format truncated

declare
   procedure tijdlijn(p_naam varchar2, p_tabel varchar2, p_label varchar2, p_where varchar2 default null, p_orderby varchar2 default 'ingangsdatum', p_first boolean default false) is
   type r_periode is record ( label varchar2(32767), ingangsdatum date, einddatum date );
   type t_periodes is table of r_periode index by binary_integer;
   l_perodes     t_periodes;
   l_first       boolean := p_first;
   l_first_p     boolean := true;
   l_statement   varchar2(32767) := 'select {label} label, ingangsdatum, einddatum from ';
   begin
      if l_first then dbms_output.put_line('{'); l_first := false; else dbms_output.put_line(',{'); end if;
      dbms_output.put_line('naam: "' || p_naam || '"');
      dbms_output.put_line(',kleur: "#' || substr(dbms_crypto.hash(utl_raw.cast_to_raw(p_naam), 1), 1, 6) || '"');
      dbms_output.put_line(',periodes: [');

      l_statement := replace(l_statement, '{label}', p_label);
      l_statement := l_statement || p_tabel;
      if p_where is not null then l_statement := l_statement || ' where ' || p_where; end if;
      if p_orderby is not null then l_statement := l_statement || ' order by ' || p_orderby; end if;
      execute immediate l_statement bulk collect into l_perodes;
      for indx in 1 .. l_perodes.count loop
         if l_first_p then dbms_output.put_line('{'); l_first_p := false; else dbms_output.put_line(',{'); end if;
         dbms_output.put_line('label: "' || l_perodes(indx).label || '"');
         dbms_output.put_line(',ingangsdatum: "' || to_char(l_perodes(indx).ingangsdatum, 'yyyy-mm-dd hh24:mi:ss') || '"');
         if l_perodes(indx).einddatum is not null then
            dbms_output.put_line(',einddatum: "' || to_char(l_perodes(indx).einddatum, 'yyyy-mm-dd hh24:mi:ss') || '"');
         end if;
         dbms_output.put_line('}');
      end loop;
      dbms_output.put_line(']');
      dbms_output.put_line('}');
   end;

begin
   dbms_output.put_line('[');
--   tijdlijn('CTE', 'contract_type', 'code', 'id=1004', null, true);
--   tijdlijn('WCT', 'werkgever_contracten', 'code', 'id=1000');
--   tijdlijn('DCT', 'dienstverband_contracten', 'omschrijving', 'id=1000');
   tijdlijn('122589-P0109', 'pas_basisgegevens', 'waarde', 'ase_id=122589 and prr_code=''P0109''');
   dbms_output.put_line(']');
end;
/

--PAS> select * from (
--  2  select psn_id, ase_id, prr_code, count(*) aantal
--  3  from pas_basisgegevens
--  4  group by psn_id, ase_id, prr_code
--  5  order by aantal desc
--  6  ) where rownum < 11
--  7  /
--
--    PSN_ID     ASE_ID PRR_CODE       AANTAL
------------ ---------- ---------- ----------
--               122589 P0109             323
--                20692 P0109             323
--               130119 P0109             315
--               117420 P0109             314
--               127507 P0109             313
--               123400 P0109             312
--               118475 P0109             309
--               112146 P0109             309
--               117690 P0109             306
--               130830 P0109             305